import React, { useState }  from 'react';
import AuthForm from './AuthForm';

const VerifyPhoneNumber = ()=> {
  const [code, setCode] = useState(false);

  return (
    <div className="container verify">
      <div className="alert alert-info">
        <strong>Info!</strong> {code?'A verification code has been sent to your phone number. Please provide the code in the form below.':'Please verify your Phone number'}
      </div>
      <AuthForm action="verify" code={false}/>
    </div>
  );
};

export default VerifyPhoneNumber;
