import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import ProductReducer from './ProductReducer';
import SelectionReducer from './SelectionReducer';
// import EmployeeFormReducer from './EmployeeFormReducer';
// import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,
  users: UserReducer,
  products: ProductReducer,
  selectedProductId: SelectionReducer
});
