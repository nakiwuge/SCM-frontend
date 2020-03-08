import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { SendCode, resetError } from '../../Actions/Auth';
import { useHandleChange,useHandleSubmit } from './CustomHooks';

const VerifyPhoneNumber = ({data,SendCode,error,history, resetError})=> {
  const [number, setNumber] = useState('');
  const [errr, setError] = useState('');
  const [isLoading, setLoader] = useState(false);

  const [handleChange] = useHandleChange(setError,setNumber);
  const [handleSubmit] = useHandleSubmit({phoneNumber:number},setLoader,setError,SendCode);

  useEffect(()=>{

    if(error){
      setError(error);
    }
    return () => {
      resetError();
    };
  }, [error]);

  useEffect(()=>{
    if(data){
      history.push('verify-code');
    }
  }, [data]);

  return (
    <div className="container verify">
      <section>
        <div className="alert alert-info">
        Please verify your Phone number
        </div>
        <AuthForm
          action="verify"
          code={data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={errr}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

const mapStateToProps = ({AuthReducer})=>({
  data:AuthReducer.code,
  error:AuthReducer.error

});
export default connect(mapStateToProps,{SendCode,resetError})(VerifyPhoneNumber);
