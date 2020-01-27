import React, { useState }  from 'react';
import AuthForm from './AuthForm';

const ResetPassword = ()=> {
  const [code, setCode] = useState(false);

  return (
    <div className="container reset-pwd">
      <h1>Reset Password</h1>
      <div className="alert alert-info">
     Please fill in the form below to reset your password
      </div>
      <AuthForm action="reset password" code={false}/>
    </div>
  );
};

export default ResetPassword;
