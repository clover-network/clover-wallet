import * as Types from './action-types';

const initialState = {
  error: null,
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UNLOCK_CLOVER_SUCCESS:
      return {
        ...state,
        ...{
          success: true,
        },
      };
    case Types.UNLOCK_CLOVER_ERROR:
      return {
        ...state,
        ...{
          error: action.error,
        },
      };
    default:
      return state;
  }
};

export default reducer;
