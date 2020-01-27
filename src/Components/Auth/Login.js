import React from 'react';
import AuthForm from './AuthForm';

class Login extends React.Component  {
  render(){
    return (
      <div className="container login">
       <div className="header">
       <h1>Login  Here</h1>
           </div>
        <AuthForm action="login"/>
      </div>
    );
  }
}

export default Login;
