import { VALUE_CHANGED } from './types';

export const valueChanged = (value, key) => {
  return {
    type: VALUE_CHANGED,
    payload: { value, key }
  };
};
