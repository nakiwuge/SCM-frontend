/* eslint-disable no-case-declarations */
import axios from 'axios';
import * as types from '../Types';
import {config} from '../../Config/axios';

const transType = (type,payload)=>({
  type,
  payload
});

export const addTransaction = (data)=>async dispatch=>{

  return axios.post('/transactions', data, await config())
    .then((res)=>{

      return  dispatch(transType(types.ADD_TRANSACTION_SUCCESS,res.data.data));
    })
    .catch(err=>{
      const {error}=err.response.data;

      if(error.includes('users_email_key')){
        return dispatch(transType(types.ADD_TRANSACTION_FAILURE,'Email already exists'));
      }

      dispatch(transType(types.ADD_TRANSACTION_FAILURE,error));
    });
};

export const getTransactions = (userId) => async dispatch=>{
  const url = userId?`/transactions/${userId}`:'/admin/transactions';

  return axios.get(url,await config())
    .then((res)=>{
      return  dispatch(transType(types.GET_TRANSACTIONS_SUCCESS,res.data.data));
    })
    .catch(err=>{
      if (err.response){
        const {error}=err.response.data;

        return dispatch(transType(types.GET_TRANSACTIONS_FAILURE,error));
      }
    });
};

export const resetError = ()=>dispatch=>{
  return dispatch(transType(types.RESET_ERROR,null));
};

export const deleteTransaction= (id)=> async dispatch=>{
 
  return axios.delete(`/transactions/${id}`, await config())
    .then((res)=>{
      return  dispatch(transType(types.DELETE_TRANSACTION_SUCCESS,res.data.data));
    })
    .catch(err=>{
      if (err.response){
        const {error}=err.response.data;

        return dispatch(transType(types.DELETE_TRANSACTION_FAILURE,error));
      }
    });
};

export const undoTransaction = (id)=> async dispatch=>{
 
  return axios.put(`/transactions/${id}`, {}, await config())
    .then((res)=>{
      return  dispatch(transType(types.UNDO_TRANSACTION_SUCCESS,res.data.data));
    })
    .catch(err=>{
      if (err.response){
        const {error}=err.response.data;

        return dispatch(transType(types.UNDO_TRANSACTION_FAILURE,error));
      }
    });
};

const initiaState = {
  transaction:null,
  transactions:null,
  error:null,
};

export const transactionReducer =(state=initiaState,action)=>{
  switch(action.type){
  case types.GET_TRANSACTIONS_SUCCESS:
    return {...state,transactions:action.payload};
  case types.GET_TRANSACTIONS_FAILURE:
    return {...state,error:action.payload};
  case types.ADD_TRANSACTION_SUCCESS:
    return {...state,transactions:[action.payload, ...state.transactions], transaction:action.payload};
  case types.ADD_TRANSACTION_FAILURE:
    return {...state,error:action.payload};
  case types.DELETE_TRANSACTION_SUCCESS:
    const transactions = state.transactions.filter((item)=> item.transaction_id!==action.payload.id);
    return {...state, transaction:action.payload,transactions};
  case types.DELETE_TRANSACTION_FAILURE:
    return {...state,error:action.payload};
  case types.UNDO_TRANSACTION_SUCCESS:
    return {...state, transaction:action.payload,transactions:[action.payload, ...state.transactions]};
  case types.UNDO_TRANSACTION_FAILURE:
    return {...state,error:action.payload};
  case types.RESET_ERROR:
    return {...state,error:action.payload};
  default:
    return state;
  }
};
