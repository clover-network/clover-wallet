/* eslint-disable no-unused-vars */
import moment from "moment";
import BN from "bn.js";
import _ from "lodash";
import * as Transaction from "../../lib/constants/transaction";
import * as FeeService from "./fee-service";
import { getStore } from "../store/store-provider";
import * as transactionActions from "../actions/transactions";
import { updateTransactionsState } from "./store-service";
import * as Notification from "../../lib/services/extension/notifications";
import { createTransactionToastMessage } from "../../lib/services/static-message-factory-service";
import { convertUnit } from "./unit-converter";
import { getBaseUnit } from "../apis/chain";
import {
  KUSAMA_NETWORK,
  FUSOTAO_NETWORK,
  ACALA_NETWORK,
  POLKADOT_NETWORK,
} from "../../lib/constants/networks";
import { getBalance, valueFormatter } from "./balance-service";
import { isValidAddress } from "./account-service";
import { validateTxnObject } from "../../lib/services/validation-service";

const extension = require("extensionizer");

//  update transaction State
const updateTransaction = async (transaction) => {
  getStore().dispatch(transactionActions.fetchTransaction(transaction));
};

const updateTransactionObj = (transaction, txnHash, txnStatus) => ({
  ...transaction,
  status: txnStatus,
  date: moment().format(),
  txnHash,
});

export const getTxnError = () => ({
  isError: false,
  isToAddressError: false,
  toAddressErrorMessage: null,
  isAmountError: false,
  toAmountErrorMessage: null,
});

export const isValidTxnAmount = (balance, totalAmount, network) => {
  if (network.value === KUSAMA_NETWORK.value) {
    return (
      balance.gt(new BN(Transaction.KUSAMA_MINIMUM_BALANCE)) &&
      balance.gte(totalAmount)
    );
  }
  if (network.value === POLKADOT_NETWORK.value) {
    return (
      balance.gt(new BN(Transaction.MINIMUM_BALANCE)) && balance.gt(totalAmount)
    );
  }
  if (network.value === FUSOTAO_NETWORK.value) {
    return (
      balance.gt(new BN(Transaction.FUSOTAO_MINIMUM_BALANCE)) &&
      balance.gt(totalAmount)
    );
  }
  return balance.gt(totalAmount);
};

export const mergeTransactions = async (newTransaction) => {
  const { transactionArr } = getStore().getState().transactionState;
  // remove Pending duplicate TXN and overide with new Status
  const pendingTransactionIndex = transactionArr.findIndex(
    (x) => x.txnHash === newTransaction.txnHash
  );
  if (pendingTransactionIndex > -1) {
    transactionArr.splice(pendingTransactionIndex, 1, newTransaction);
  } else {
    transactionArr.push(newTransaction);
  }
  return transactionArr;
};

// filter transactions
export const filterTransactions = async (transactions, network, address) => {
  let newTransactions = [];
  if (network !== undefined) {
    newTransactions = transactions.filter(
      (tx) => tx.internal.network.value === network.value
    );
  }
  if (address !== undefined) {
    newTransactions = newTransactions.filter(
      (tx) => tx.internal.address === address
    );
  }
  return newTransactions;
};

export const getTransactionFees = async (
  txnType,
  senderAddress,
  toAddress,
  transactionLength
) => {
  switch (txnType) {
    case Transaction.TRANSFER_COINS: {
      const fees = await FeeService.getTransferFees(
        senderAddress,
        toAddress,
        transactionLength
      );
      return fees;
    }
    default:
      throw new Error("Wrong Transaction Type");
  }
};

export const sendOSNotification = async (transaction) => {
  const { message } = createTransactionToastMessage(transaction);
  const txnDetailURl = `${transaction.internal.network.transactionUrl}/${transaction.txnHash}`;
  await Notification.createNotification("FUSOTAO", message, txnDetailURl);
};

export const updateTransactionState = async (
  transaction,
  txnHash,
  txnStatus
) => {
  const newTransaction = updateTransactionObj(transaction, txnHash, txnStatus);
  const newTransactionArr = await mergeTransactions(newTransaction);
  if (txnStatus === Transaction.PENDING) {
    await updateTransaction(newTransaction);
  } else {
    await updateTransaction(undefined);
    const views = extension.extension.getViews({ type: "popup" });
    if (views.length === 0) {
      await sendOSNotification(newTransaction);
    }
  }
  await updateTransactionsState(newTransactionArr);
};

const createTransactionObj = (transaction) => {
  const {
    to,
    account,
    amount,
    unit,
    fAmount,
    fees,
    totalAmount,
    network,
    token,
  } = transaction;
  const newTransactionObject = {
    txnType: Transaction.TRANSFER_COINS,
    metadata: {
      account,
      to,
      amount,
      unit,
      fAmount,
      fees,
      transferFee: valueFormatter(fees.totalFee, token),
      transferAmount: valueFormatter(fAmount, token),
      totalTransferAmount: valueFormatter(totalAmount, token),
      token,
    },
    internal: { address: account.address, network },
  };
  return newTransactionObject;
};

const validateAmount = async (
  senderAddress,
  network,
  transaction,
  seedWords,
  keypairType
) => {
  const { to, account, amount, unit, txnType, token } = transaction;
  const fAmount = convertUnit(amount.toString(), unit.text, getBaseUnit().text); // converting in femto
  // TODO MM: Take 0 Signature size to show 10 milli fees like polkadot
  // const transactionLength = await getTxnEncodedLength(to, fAmount, seedWords, keypairType);
  const transactionLength = Transaction.SIGNATURE_SIZE;
  const fees = await getTransactionFees(
    txnType,
    senderAddress,
    to,
    transactionLength
  ); // in femto
  const balanceObj = await getBalance(senderAddress); // in femto
  const balance = _.chain(balanceObj.tokens)
    .find((t) => t.token === token)
    .get("balance")
    .value();
  const { totalFee } = fees;
  const totalAmount = new BN(fAmount).add(new BN(totalFee));
  const balanceInBN = new BN(balance);
  const isValidAmount = isValidTxnAmount(balanceInBN, totalAmount, network);
  if (isValidAmount) {
    return {
      to,
      account,
      unit,
      amount,
      fAmount,
      fees,
      totalAmount,
      network,
      isValidAmount,
      token,
    };
  }
  return { isValidAmount };
};

export const confirmTransaction = async (
  senderAddress,
  network,
  transaction,
  seedWords,
  keypairType
) => {
  // validate transaction object
  let newTransaction;
  const vTransaction = validateTxnObject(transaction);
  if (vTransaction !== undefined) return vTransaction;

  const txnError = getTxnError();

  if (isValidAddress(transaction.to)) {
    // validate amount
    newTransaction = await validateAmount(
      senderAddress,
      network,
      transaction,
      seedWords,
      keypairType
    );
    const { isValidAmount } = newTransaction;
    if (isValidAmount) {
      newTransaction = createTransactionObj(newTransaction);
    } else {
      txnError.isError = true;
      txnError.isAmountError = true;
      txnError.toAmountErrorMessage = "Insufficient Balance";
    }
  } else {
    txnError.isError = true;
    txnError.isToAddressError = true;
    txnError.toAddressErrorMessage = "Invalid Address";
  }
  return { ...newTransaction, ...txnError };
};

export const updateWeb3Transactions = async (transaction) => {
  const { web3TransactionArr } = getStore().getState().transactionState;
  web3TransactionArr.push(transaction);
  getStore().dispatch(
    transactionActions.fetchWeb3Transactions(web3TransactionArr)
  );
};
