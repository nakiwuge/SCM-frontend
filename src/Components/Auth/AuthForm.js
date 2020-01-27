import React from 'react';
import { Link } from 'react-router-dom';

const AuthForm = ({action,code}) => {

  return (

    <div className="container auth-form">
      <div className="alert alert-danger">
        <strong>Error!</strong> Indicates a dangerous or potentially negative action.
      </div>
      <form >
        <div className="form-group" hidden={(action=='reset password' || code)}>
          <label htmlFor="phone-number">Phone Number:</label>
          <input type="phone-number" className="form-control" id="phone-number" required/>
        </div>
        <div className="form-group" hidden={!(code)}>
          <label htmlFor="code">Verification Code:</label>
          <input type="number" className="form-control" id="code" required/>
        </div>
        <div className="form-group" hidden={(action=='verify')}>
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" required/>
        </div>
        <div className="form-group" hidden={!(action=='reset password')}>
          <label htmlFor="cpwd">Confirm Password:</label>
          <input type="password" className="form-control" id="cpwd" required/>
        </div>
        <div className="forgot-pwd"  hidden={!(action=='login')}>
          <Link to="#">Forgot Password?</Link>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
