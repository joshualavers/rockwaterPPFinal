import * as types from '../actions/types';

const INITIAL_STATE = {
  products: [{ key: 'sampleKey', name: 'sampleName', value: 69 }],
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  const newState = state;
  switch (action.type) {
    case types.VALUE_CHANGED:
    console.log('KEYYYYY: ', action.payload.key);
      if (action.payload.key) {
        console.log('TRUTHY');
        // const newState = state;
        for (var i = 0; i < newState.products.length; i++) {
          if (newState.products[i].key === action.payload.key) {
            newState.products[i].value = action.payload.value;
            console.log('newState babyyyayy ===> ', newState);
            return { ...state };
          }
        }
      }
      return { newState };
    case types.PRODUCT_FETCH_SUCCESS:
    console.log('action.payload in fetch success ------> ', action.payload);
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
