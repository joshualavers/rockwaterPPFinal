import * as types from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case types.SELECT_PRODUCT:
      console.log('SELECTION PAYLOAD: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};
