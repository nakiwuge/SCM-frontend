import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { verifyCode, resetError } from '../../Actions/Auth';
import { useHandleChange,useHandleSubmit } from './CustomHooks';

const VerifyCode = ({isVerified,verifyCode,error,history,resetError})=> {
  const [code, setCode] = useState('');
  const [err, setError] = useState(null);
  const [isLoading, setLoader] = useState(false);
  const [handleChange] = useHandleChange(setError,setCode);
  const [handleSubmit] = useHandleSubmit({verificationCode:code},setLoader,setError,verifyCode);

  useEffect(()=>{
    if(error){
      setError(error);
    }
    return () => {
      resetError();
    };
  }, [error]);

  useEffect(()=>{
    if(isVerified){
      history.push('/password-reset');
    }
  }, [isVerified]);

  return (
    <div className="container verify">
      <div className="alert alert-info">
       A verification code has been sent to your phone number. Please provide the code in the form below.
        <p>Click <Link to='verify'>here</Link> to resend code </p>
      </div>
      <AuthForm
        action="verify-code"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={err}
        isLoading={isLoading}
      />
    </div>
  );
};

const mapStateToProps = ({AuthReducer})=>({
  isVerified:AuthReducer.isVerified,
  error:AuthReducer.error

});
export default connect(mapStateToProps,{verifyCode,resetError})(VerifyCode);
