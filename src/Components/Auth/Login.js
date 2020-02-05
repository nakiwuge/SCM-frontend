import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { login, resetError } from '../../Actions/Auth';
import { useHandleChange,useHandleSubmit } from './CustomHooks';

const Login = ({user,login,error,history,resetError})=> {
  const [data, setData] = useState({phoneNumber:'', password:''});
  const [err, setError] = useState(null);
  const [isLoading, setLoader] = useState(false);
  const [handleChange] = useHandleChange(setError,setData,data,true);
  const [handleSubmit] = useHandleSubmit(data,setLoader,setError,login);

  useEffect(()=>{
    if(error){
      setError(error);
    }
    return () => {
      resetError();
    };
  }, [error]);

  useEffect(()=>{
    if(user){
      history.push('/');
    }
  }, [user]);

  return (
    <div className="container login">
      <div className="header">
        <h1>Login  Here</h1>
      </div>
      <AuthForm
        action="login"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={err}
        isLoading={isLoading}
      />
    </div>
  );
};

const mapStateToProps = ({AuthReducer})=>({
  user:AuthReducer.user,
  error:AuthReducer.error

});
export default connect(mapStateToProps,{login,resetError})(Login);

