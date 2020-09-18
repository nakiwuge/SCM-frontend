import axios from 'axios';
import * as types from '../Types';
import {config} from '../../Config/axios';

const userType = (type,payload)=>({
  type,
  payload
});

export const addUser = (data)=>async dispatch=>{

  return axios.post('/admin/users', data, await config())
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

export const getUsers = () => async dispatch=>{

  return axios.get('/admin/users',await config())
    .then((res)=>{
      return  dispatch(userType(types.GET_USERS_SUCCESS,res.data.data));
    })
    .catch(err=>{
      if (err.response){
        const {error}=err.response.data;

        return dispatch(userType(types.GET_USERS_FAILURE,error));
      }
    });
};

export const getUser = (id)=>async dispatch=>{

  return axios.get(`/users/${id}`,await config())
    .then((res)=>{

      return dispatch(userType(types.GET_USER_SUCCESS,res.data.data));
    })
    .catch(err=>{
      if(err.response){
        return  dispatch(userType(types.GET_USER_FAILURE,err.response.data.error));
      }
    });
};

export const resetError = ()=>dispatch=>{
  return dispatch(userType(types.RESET_ERROR,null));
};

export const resetUser= ()=>dispatch=>{

  return dispatch(userType(types.RESET_USER,null));
};

const initiaState = {
  user:null,
  users:null,
  error:null,
  currentUser:null
};

export const userReducer =(state=initiaState,action)=>{

  switch(action.type){
  case types.ADD_USER_SUCCESS:
    return {...state,user:action.payload};
  case types.ADD_USER_FAILURE:
    return {...state,error:action.payload};
  case types.GET_USERS_SUCCESS:
    return {...state,users:action.payload};
  case types.GET_USERS_FAILURE:
    return {...state,error:action.payload};
  case types.GET_USER_SUCCESS:
    return {...state,currentUser:action.payload};
  case types.GET_USER_FAILURE:
    return {...state,error:action.payload};
  case types.RESET_ERROR:
    return {...state,error:action.payload};
  case types.RESET_USER:
    return {...state,user:action.payload};
  default:
    return state;
  }
};
