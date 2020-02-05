import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { setPassword, resetError } from '../../Actions/Auth';
import { useHandleChange, useHandleSubmit } from './CustomHooks';

const ResetPassword = ({setPassword,error,user, history})=> {
  const [data, setData] = useState({
    password:'',
    confirmPassword:''
  });
  const [err, setError] = useState(null);
  const [isLoading, setLoader] = useState(false);
  const [handleChange] = useHandleChange(setError,setData,data,true);
  const [handleSubmit] = useHandleSubmit(data,setLoader,setError,setPassword);

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
      history.push('/login');
    }
  }, [user]);

  return (
    <div className="container reset-pwd">
      <h1>Reset Password</h1>
      <div className="alert alert-info">
     Please fill in the form below to set your password
      </div>
      <AuthForm
        action="reset password"
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={err}
      />
    </div>
  );
};

const mapStateToProps = ({AuthReducer})=>({
  user:AuthReducer.user,
  error:AuthReducer.error

});
export default connect(mapStateToProps,{setPassword,resetError})(ResetPassword);
