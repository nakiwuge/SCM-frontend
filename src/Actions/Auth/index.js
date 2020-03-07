import axios from 'axios';
import * as types from '../Types';

const authType = (type,payload)=>({
  type,
  payload
});

export const SendCode = (data)=>dispatch=>{

  return axios.post('/users/send-code',data)
    .then((res)=>{
      localStorage.setItem('code_jwt',res.data.data);
      dispatch(authType(types.SEND_VERIFICATION_CODE_SUCCESS,res.data.data));
    })
    .catch(err=>{
      dispatch(authType(types.SEND_VERIFICATION_CODE_FAILURE,err.response.data.error));
    });
};

export const verifyCode = (data)=>dispatch=>{

  return axios.put('/users/verify',data, {
    headers: {
      code: localStorage.getItem('code_jwt'),
    }
  })
    .then((res)=>{

      localStorage.setItem('user_id',res.data.data.id);
      dispatch(authType(types.VERIFY_VERIFICATION_CODE_SUCCESS,res.data.data));
    })
    .catch(err=>{

      dispatch(authType(types.VERIFY_VERIFICATION_CODE_FAILURE,err.response.data.error));
    });
};

export const setPassword = (data)=>dispatch=>{

  return axios.put(`/users/set-password/${localStorage.getItem('user_id')}`,data)
    .then((res)=>{

      dispatch(authType(types.SET_PASSWORD_SUCCESS,res.data.data));
    })
    .catch(err=>{

      dispatch(authType(types.SET_PASSWORD_FAILURE,err.response.data.error));
    });
};

export const login = (data)=>dispatch=>{

  return axios.post('/users/login',data)
    .then((res)=>{
      localStorage.setItem('jwt',res.data.data.token);
      dispatch(authType(types.LOGIN_SUCCESS,res.data.data));
    })
    .catch(err=>{

      dispatch(authType(types.LOGIN_FAILURE,err.response.data.error));
    });
};

export const resetError = ()=>dispatch=>{

  return dispatch(authType(types.RESET_ERROR,null));
};

const initiaState = {
  code:null,
  isVerified:null,
  user:null,
  error:null,
};
export const AuthReducer =(state=initiaState,action)=>{

  switch(action.type){
  case types.SEND_VERIFICATION_CODE_SUCCESS:
    return {...state,code:action.payload};
  case types.SEND_VERIFICATION_CODE_FAILURE:
    return {...state,error:action.payload};
  case types.VERIFY_VERIFICATION_CODE_SUCCESS:
    return {...state,isVerified:action.payload};
  case types.VERIFY_VERIFICATION_CODE_FAILURE:
    return {...state,error:action.payload};
  case types.SET_PASSWORD_SUCCESS:
    return {...state,user:action.payload};
  case types.SET_PASSWORD_FAILURE:
    return {...state,error:action.payload};
  case types.LOGIN_SUCCESS:
    return {...state,user:action.payload};
  case types.LOGIN_FAILURE:
    return {...state,error:action.payload};
  case types.RESET_ERROR:
    return {...state,error:action.payload};

  default:
    return state;
  }
};
