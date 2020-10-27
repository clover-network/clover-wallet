import * as Types from './action-types';

const initialState = {
  success: false,
  name: '',
};

const reducer = (state = { initialState }, action) => {
  switch (action.type) {
    case Types.SET_HASH_KEY_SUCCESS:
      return {
        ...state,
        ...{
          success: true,
        },
      };
    case Types.UPDATE_WALLET_NAME:
      return {
        ...state,
        ...{
          name: action.name,
        },
      };
    default:
      return state;
  }
};

export default reducer;
