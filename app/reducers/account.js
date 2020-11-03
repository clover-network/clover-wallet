import * as Types from '../constants/account';

const initialState = {
  accounts: [],
  fullChainAccounts: [],
  account: undefined,
  balances: [],
  balance: '0',
  isLinkToFaucet: false,
  seedWords: undefined,
  selectedToken: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_SEED_WORDS:
      return { ...state, seedWords: action.seedWords };
    case Types.RESET_SEED_WORDS:
      return { ...state, seedWords: undefined };
    case Types.ADD_ACCOUNT:
      return {
        ...state,
        ...{
          accounts: action.accounts,
        },
      };
    case Types.SELECT_TOKEN:
      return {
        ...state,
        ...{
          selectedToken: action.selectedToken,
        },
      };
    case Types.ADD_FULL_CHAIN_ACCOUNT:
      return {
        ...state,
        ...{
          fullChainAccounts: action.fullChainAccounts,
        },
      };
    case Types.SELECT_ACCOUNT:
      return {
        ...state,
        ...{
          account: action.account,
        },
      };
    case Types.UPDATE_ACCOUNT_BALANCE:
      return {
        ...state,
        ...{
          balances: action.balances,
        },
      };
    case Types.UPDATE_SELECTED_ACCOUNT_BALANCE:
      return {
        ...state,
        ...{
          balance: action.balance,
        },
      };
    case Types.UPDATE_IS_LINK_TO_BLOCKXLABS_FAUCET:
      return {
        ...state,
        ...{
          isLinkToFaucet: action.isLinkToFaucet,
        },
      };
    default:
      return state;
  }
};

export default reducer;
