


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
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
