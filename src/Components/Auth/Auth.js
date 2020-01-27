import React from 'react';
import Login from './Login';

const Auth = () => {
  return (
    <div className="container-fluid auth">
      <div className="row ">
        <div className="col-lg-6 left">
          <div className="logo">
            <span>D17</span> Savings Club
          </div>
        </div>
        <div className="col-lg-6">
          <Login/>
        </div>
      </div>
    </div>
  );
};

export default Auth;
