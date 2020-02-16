import { http } from '../../Config/axios';
import * as types from '../Types';

const roleType = (type,payload)=>({
  type,
  payload
});

export const getRoles = ()=>dispatch=>{

  return http.get('/admin/roles')
    .then((res)=>{
      return  dispatch(roleType(types.GET_ROLES_SUCCESS,res.data.data));
    })
    .catch(err=>{
      return dispatch(roleType(types.GET_ROLES_FAILURE,err.response.data.error));
    });
};

const initiaState = {
  roles:null,
  error:null,
};

export const rolesReducer =(state=initiaState,action)=>{
  switch(action.type){
  case types.GET_ROLES_SUCCESS:
    return {...state,roles:action.payload};
  case types.GET_ROLES_FAILURE:
    return {...state,error:action.payload};
  default:
    return initiaState;
  }
};
