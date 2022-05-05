import * as Types from '../constants/chains';


const supportsChains = [
    {
        label: 'Near',
        value: 'near' 
    },
    {
        label: 'Fusotao',
        value: 'fusotao' 
    }
]
const initialState = {
  supportChains: supportsChains,
  currentChain: 'near',
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_CHAIN : (state, payload) => {
        console.log(payload);
        return {
            ...state,
            currentChain: payload
        };
    };
    default:
      return state;
  }
};

export default reducer;
