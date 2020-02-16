import { combineReducers } from 'redux';
import { AuthReducer } from '../Actions/Auth';
import { rolesReducer } from '../Actions/Roles';
import { userReducer } from '../Actions/Users';

const rootReducer = combineReducers({
  AuthReducer,
  rolesReducer,
  userReducer
});

export default rootReducer;
