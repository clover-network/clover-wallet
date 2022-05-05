import { decodeAddress } from "@polkadot/keyring";
import { getWallet, getWallets } from "./wallet-service";
import { getStore } from "../store/store-provider";
import * as accountActions from "../actions/accounts";
import * as StorageServices from "../../lib/services/extension/storage";
import { ACCOUNTS } from "../../lib/constants/storage-keys";
import {
  updatesAccountsState,
  updateCurrentAccountState,
  updatesFullChainAccountsState,
} from "./store-service";
import {
  KEYPAIR_EDWARDS,
  DUPLICATE_ALIAS,
  BAD_REQUEST,
} from "../../lib/constants/api";
import { getAccountState } from "./store/account-store";
import { validateAddress } from "../../lib/services/validation-service";

export const validateAlias = (alias) => {
  if (alias !== undefined && alias !== null && alias !== "") {
    const { accounts } = getAccountState();
    const duplicateAlias = accounts.find((x) => x.alias === alias);
    if (duplicateAlias) throw new Error(DUPLICATE_ALIAS);
    return alias;
  }
  throw new Error("alias in required");
};

const constructAlias = (n) => {
  const { accounts } = getAccountState();
  const alias = `Account ${accounts.length + n}`;
  try {
    const vAlias = validateAlias(alias);
    return vAlias;
  } catch (err) {
    const newn = n + 1;
    return constructAlias(newn);
  }
};

export const getAddress = (seedWords, keypairType) => {
  const wallet = getWallet();
  const address = wallet.getAddress(seedWords, keypairType);
  return address;
};

export const createSeedWords = () => {
  const wallet = getWallet();
  const seedWords = wallet.createSeedWords();
  getStore().dispatch(accountActions.setSeedWords(seedWords));
  return seedWords;
};

export const createAccountWithSeed = (
  seedWords,
  keypairType,
  isOnBoarding,
  alias
) => {
  const wallet = getWallet();
  const address = wallet.getAddress(seedWords, keypairType);
  const accountAlias =
    alias === undefined ? constructAlias(1) : validateAlias(alias);
  return {
    seedWords,
    address,
    keypairType,
    alias: accountAlias,
  };
};

export const createNewAccount = (keypairType) => {
  const seedWords = createSeedWords();
  const wallet = getWallet();
  const address = wallet.getAddress(seedWords, keypairType);
  return {
    seedWords,
    address,
    keypairType,
    alias: constructAlias(address),
  };
};

const accountExists = (accounts, newAccount) => {
  const duplicateAccount = accounts.find(
    (account) => account.address === newAccount.address
  );
  if (duplicateAccount !== undefined) {
    throw new Error("Account already exist.");
  }
  return newAccount;
};

const mergeAccounts = (accounts, newAccount) => {
  const newAccounts = [...accounts, { ...newAccount }];
  return newAccounts;
};

export const getAccountForUI = (account) => ({
  address: getAddress(account.seedWords, account.keypairType),
  alias: account.alias,
  keypairType: account.keypairType,
});

const getFullChainAccounts = (accounts) => {
  const wallets = getWallets();
  const fullChainAccounts = wallets.map((item) => ({
    symbol: item.symbol,
    accounts: accounts.map((account) => ({
      alias: account.alias,
      keypairType: account.keypairType,
      address: item.wallet.getAddress(account.seedWords, account.keypairType),
    })),
  }));
  return fullChainAccounts;
};

export const updateAccountAlias = async (address, newAlias) => {
  const { accounts, currentAccount } = getAccountState();
  //validate alias
  const duplicateAlias = accounts.find((x) => x.alias === newAlias);
  if (duplicateAlias === undefined) {
    const accountIndex = accounts.findIndex((obj) => {
      const accountAddress = getAddress(obj.seedWords, obj.keypairType);
      return accountAddress === address;
    });
    // update alias
    if (accountIndex >= 0) {
      accounts[accountIndex].alias = newAlias;
      currentAccount.alias = newAlias;
      const fullChainAccounts = getFullChainAccounts(accounts);
      await Promise.all([
        updatesAccountsState(accounts),
        updateCurrentAccountState(currentAccount),
        updatesFullChainAccountsState(fullChainAccounts),
      ]);
      return { address, newAlias };
    }
    throw new Error("account is not avalible");
  }
  throw new Error("Duplicate alias");
};

// isOnboarding Require
export const getAccounts = async () => {
  const localAccountObj = await StorageServices.getLocalStorage(ACCOUNTS);
  return localAccountObj;
};

export const createAccount = async (
  seedWords,
  keypairType,
  isOnBoarding,
  alias
) => {
  // default keypair type Edwards
  const keypairTypeValue =
    keypairType === undefined ? KEYPAIR_EDWARDS.value : keypairType.value;

  // grab all the data
  const account =
    seedWords === undefined
      ? createNewAccount(keypairTypeValue)
      : createAccountWithSeed(seedWords, keypairTypeValue, isOnBoarding, alias);
  const { accounts } = getAccountState();
  // find duplication
  const newAccount = accountExists(accounts, account);
  // combine accounts
  const newAccounts = mergeAccounts(accounts, newAccount);
  // set current selected account by default last created account
  const fullChainAccounts = getFullChainAccounts(newAccounts);
  await Promise.all([
    updatesAccountsState(newAccounts),
    updateCurrentAccountState(account),
    updatesFullChainAccountsState(fullChainAccounts),
  ]);
  // return  created account address
  return account;
};

export const updateCurrentAccount = async (address) => {
  // default keypair type Edwards
  const { accounts } = getAccountState();
  const newAccount = accounts.find((obj) => {
    const accountAddress = getAddress(obj.seedWords, obj.keypairType);
    return accountAddress === address;
  });
  if (newAccount !== undefined) {
    await updateCurrentAccountState(newAccount);
    return newAccount;
  }
  throw new Error("account is not avalible");
};

export const removeAccount = async (address, alias) => {
  // get privious accounts
  const { accounts } = getAccountState();
  const filteredAccounts = accounts.filter((obj) => {
    if (obj.alias !== alias) {
      return obj;
    }
  });
  // update reducer state
  await updatesAccountsState(filteredAccounts);

  const fullChainAccounts = getFullChainAccounts(filteredAccounts);
  await updatesFullChainAccountsState(fullChainAccounts);
  return true;
};

export const getAccountStateForUi = (accountState) => {
  // FE not require seedwords
  const { accounts, currentAccount, fullChainAccounts } = accountState;
  const reformattedCurrentAccount = getAccountForUI(currentAccount);
  const reformattedAccounts = accounts.map((obj) => {
    const account = getAccountForUI(obj);
    return account;
  });
  const newAccountState = {
    accounts: reformattedAccounts,
    fullChainAccounts,
    currentAccount: reformattedCurrentAccount,
    seedWords: accountState.seedWords,
    hasAccount: accountState.hasAccount,
  };
  return newAccountState;
};

export const accountForDapp = (accountState) => {
  if (accountState === undefined) {
    return {
      status: BAD_REQUEST,
      message: "The request requires data object for authentication.",
    };
  }
  const { accounts } = accountState;
  if (accounts !== undefined) {
    const reformattedAccounts = accounts.map((obj) => {
      const accountsWithoutSeedWords = {
        address: getWallet().getAddress(obj.seedWords, obj.keypairType),
        name: obj.alias,
        meta: {
          name: obj.alias,
          source: "fusotao",
        },
      };
      return accountsWithoutSeedWords;
    });
    return reformattedAccounts;
  }
  return {
    status: BAD_REQUEST,
    message: "The request requires proper accountState.",
  };
};

export const isValidAddress = (address) => {
  const wallet = getWallet();
  return wallet.isValidAddress(address);
};

// never share with popup.js
export const getAccount = (address) => {
  const vAddress = validateAddress(address);
  if (vAddress) return vAddress;
  const { accounts } = getAccountState();
  const accountsWithAddress = accounts.map((obj) => {
    const account = {
      address: getAddress(obj.seedWords, obj.keypairType),
      alias: obj.alias,
      seedWords: obj.seedWords,
      keypairType: obj.keypairType,
    };
    return account;
  });
  const account = accountsWithAddress.find(
    (account) =>
      JSON.stringify(decodeAddress(account.address)) ===
      JSON.stringify(decodeAddress(address))
  );
  if (account) {
    return account;
  }
  throw new Error("Account is not exist");
};
