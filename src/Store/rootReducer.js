import { combineReducers } from 'redux';
import { AuthReducer } from '../Actions/Auth';
import { rolesReducer } from '../Actions/Roles';
import { userReducer } from '../Actions/Users';
import { transactionReducer } from '../Actions/Transactions';

const rootReducer = combineReducers({
  AuthReducer,
  rolesReducer,
  userReducer,
  transactionReducer
});

export default rootReducer;
