import BN from 'bn.js';
import { formatNumber, bnToBn } from '@polkadot/util';
import { createType } from '@polkadot/types';
import { getTransactionFees, getTxnError, updateTransactionState } from './transaction-service';
import * as TXAPI from '../apis/tx';
import { getApi } from '../apis/chain';
import { valueFormatter } from './balance-service';
import { findChain, findChainByName } from '../../lib/constants/chain';
import * as Transaction from '../../lib/constants/transaction';
import { validateDappTxnObject } from '../../lib/services/validation-service';
import { getAccount } from './account-service';
import * as NetworkService from './network-service';

export const PERIOD = 10;

//Original Source: https://github.com/polkadot-js/extension
//Original Author: Jaco Greeff
const decodeMethod = (data, isDecoded, sVersion) => {
  let json = null;
  let method = null;

  try {
    if (isDecoded && sVersion) {
      // const metaCalls = getMetaCalls();
      // if (metaCalls) {
      //   alert(JSON.stringify(metaCalls));
      //   const metadata = new Metadata(getApi().registry, Buffer.from(metaCalls, 'base64'));
      //   alert(JSON.stringify(metadata));
      // }
      method = getApi().registry.createType('Call', data);
      json = method.toHuman();
    }
  } catch (error) {
    json = null;
    method = null;
  }

  return { json, method };
};

const getPayload = request => {
  const payload = createType(getApi().registry, 'ExtrinsicPayload', request, {
    version: request.version,
  });
  return payload;
};

const mortalityAsString = async (exERA, hexBlockNumber) => {
  try {
    if (exERA.isImmortalEra) {
      return 'immortal';
    }
    const blockNumber = bnToBn(hexBlockNumber);
    const mortal = exERA.asMortalEra;
    return `mortal, valid from #${formatNumber(mortal.birth(blockNumber))} to #${formatNumber(
      mortal.death(blockNumber),
    )}`;
  } catch (err) {
    return 'working on mortality';
  }
};

const createTxnUIObject = async (txnPayload, network) => {
  const {
    address, blockHash, blockNumber, method, specVersion
  } = txnPayload;
  const chain = findChainByName(network.value);
  const payload = getPayload(txnPayload);
  const { era, nonce, tip } = payload;

  const sVersion = bnToBn(specVersion).toNumber();
  const mortality = await mortalityAsString(era, blockNumber);
  const decodedMethod = decodeMethod(method, true, sVersion);
  const {
    method: { dest, value },
    json,
  } = decodedMethod;
  const note = '';
  const sectionName = json.section;
  const methodName = json.method;

  return {
    address,
    blockHash,
    chain: chain.name,
    sVersion,
    mortality,
    nonce: formatNumber(nonce),
    tip: formatNumber(tip),
    sectionName,
    method: `${sectionName}.${methodName}`,
    dest,
    value: bnToBn(value),
    note,
  };
};

export const setNetwork = async txnPayload => {
  const { genesisHash } = txnPayload;
  const chain = findChain(genesisHash);
  const network = NetworkService.getNetworkByName(chain.name);
  await NetworkService.updateCurrentNetwork(network);
  return network;
};

export const validateDappTransaction = async transaction => {
  // validate transaction object

  const vTransaction = validateDappTxnObject(transaction);

  if (vTransaction !== undefined) return vTransaction;

  const txnError = getTxnError();
  const { url, txnPayload, network } = transaction;

  // creating txnForUI object
  const txnForUI = await createTxnUIObject(txnPayload, network);
  const { address, value, dest } = txnForUI;

  // get Txn Fees.
  const transactionLength = Transaction.SIGNATURE_SIZE;
  const txnType = Transaction.TRANSFER_COINS;
  const fees = await getTransactionFees(txnType, address, dest, transactionLength); // in femto
  const totalAmount = new BN(value).add(new BN(fees.totalFee));

  const newTransaction = {
    txnForUI: {
      ...txnForUI,
      url,
      transferFee: valueFormatter(fees.totalFee),
      transferAmount: valueFormatter(value),
      totalTransferAmount: valueFormatter(totalAmount),
    },
    txnPayload,
  };

  return {
    ...newTransaction,
    ...txnError,
  };
};

export const signTransaction = async txnPayload => {
  const network = NetworkService.getCurrentNetwork();
  // For storing txn in TXN_LIST
  const txnForUI = await createTxnUIObject(txnPayload, network);
  const { address, value, dest } = txnForUI;
  const account = getAccount(address);
  const metadata = {
    to: dest,
    fAmount: value,
    account: { address },
    transferAmount: valueFormatter(value),
  };
  const transaction = {
    metadata,
    internal: { address, network },
    txnType: Transaction.TRANSFER_COINS,
  };

  // create signature for Dapp
  const signature = await TXAPI.getSignature(account, txnPayload);

  // Fetch Transaction State
  const txnHash = '';
  await updateTransactionState(transaction, txnHash, Transaction.DAPP);

  return signature;
};
