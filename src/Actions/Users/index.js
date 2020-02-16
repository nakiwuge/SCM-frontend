import { http } from '../../Config/axios';
import * as types from '../Types';

const userType = (type,payload)=>({
  type,
  payload
});

export const addUser = (data)=>dispatch=>{

  return http.post('/admin/users', data)
    .then((res)=>{

      return  dispatch(userType(types.ADD_USER_SUCCESS,res.data.data));
    })
    .catch(err=>{
      const {error}=err.response.data;

      if(error.includes('users_email_key')){
        return dispatch(userType(types.ADD_USER_FAILURE,'Email already exists'));
      }

      dispatch(userType(types.ADD_USER_FAILURE,error));
    });
};

export const resetError = ()=>dispatch=>{
  return dispatch(userType(types.RESET_ERROR,null));
};

const initiaState = {
  user:null,
  error:null,
};

export const userReducer =(state=initiaState,action)=>{
  switch(action.type){
  case types.ADD_USER_SUCCESS:
    return {...state,user:action.payload};
  case types.ADD_USER_FAILURE:
    return {...state,error:action.payload};
  case types.RESET_ERROR:
    return {...state,error:action.payload};
  default:
    return initiaState;
  }
};
