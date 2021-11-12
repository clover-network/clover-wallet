import * as AccountActionTypes from "../constants/account";
import * as AddressBookActionTypes from "../constants/address-book";
import { Account } from "../api";
import { getDummyBalanceObject } from "../utils/helper";
import * as AppActions from '../containers/actions';
import * as NavConstants from '../constants/navigation';

export const selectTokenAction = (selectedToken) => ({
  type: AccountActionTypes.SELECT_TOKEN,
  selectedToken,
});

export const updateAccountList = (accounts) => ({
  type: AccountActionTypes.ADD_ACCOUNT,
  accounts,
});

export const updateFullChainAccountList = (fullChainAccounts) => ({
  type: AccountActionTypes.ADD_FULL_CHAIN_ACCOUNT,
  fullChainAccounts,
});

export const updateContactList = (addressBook) => ({
  type: AddressBookActionTypes.UPDATE_ADDRESS_BOOK_LIST,
  addressBook,
});

export const changeSelectedAccount = (account) => ({
  type: AccountActionTypes.SELECT_ACCOUNT,
  account,
});

export const updateAccountBalance = (balances) => ({
  type: AccountActionTypes.UPDATE_ACCOUNT_BALANCE,
  balances,
});

export const updateSelectedAccountBalance = (balance) => ({
  type: AccountActionTypes.UPDATE_SELECTED_ACCOUNT_BALANCE,
  balance,
});

export const updateIsLinkToBlockxLabFaucet = (isLinkToFaucet) => ({
  type: AccountActionTypes.UPDATE_IS_LINK_TO_BLOCKXLABS_FAUCET,
  isLinkToFaucet,
});

export const setSeedWords = (seedWords) => ({
  type: AccountActionTypes.SET_SEED_WORDS,
  seedWords,
});

export const resetSeedWords = () => ({
  type: AccountActionTypes.RESET_SEED_WORDS,
});

export const fetchAndSetAccounts = async (dispatch) => {
  const {
    result: { accounts, currentAccount, fullChainAccounts },
  } = await Account.getAccounts();
  dispatch(updateAccountList(accounts));
  dispatch(updateFullChainAccountList(fullChainAccounts));
  dispatch(changeSelectedAccount(currentAccount));
};

export const fetchAndSetBalances = async (dispatch, getState) => {
  const { accounts, account } = getState().accountReducer;
  const addrArray = accounts.map(({ address }) => address);
  const { result: balances } = await Account.getCurrentBalance(addrArray);
  if(balances[0].status === 500){
    //已断开链接 
    // dispatch(AppActions.changePage(NavConstants.SIGN_IN_PAGE));
    // return;
  }
  const balObj = balances.find((acc) => acc.address === account.address);
  // Link Faucets with No Transaction yet.
  const { network } = getState().networkReducer;
  const isLinkToFaucet = network.faucetUrl && balObj.balance === "0";
  dispatch(updateAccountBalance(balances));
  dispatch(updateSelectedAccountBalance(balObj));
  dispatch(updateIsLinkToBlockxLabFaucet(isLinkToFaucet));
};

export const setInitialBalance = async (dispatch, getState) => {
  const accountObj = getState().accountReducer;
  const { balances, balance } = getDummyBalanceObject(accountObj);
  dispatch(updateAccountBalance(balances));
  dispatch(updateSelectedAccountBalance(balance));
};

export const getSeedWords = () => async (dispatch) => {
  const seedWords = await Account.getSeedWords();
  if (seedWords !== undefined) {
    dispatch(setSeedWords(seedWords));
  }
};

export const fetchAndSetContacts = async (dispatch) => {
  const {
    result: { addressBook },
  } = await Account.getContacts();
  dispatch(updateContactList(addressBook));
};

export const selectToken = (selectedToken) => async (dispatch) => {
  dispatch(selectTokenAction(selectedToken));
};
