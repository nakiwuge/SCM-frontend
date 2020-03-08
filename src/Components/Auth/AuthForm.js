import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/button';

const AuthForm = ({
  action,
  handleChange,
  handleSubmit,
  error,
  isLoading,
}) => {

  return (
    <div className="container auth-form">
      <div className="alert alert-danger" hidden={!error}>
        <strong>Error!</strong> {error}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group phone" hidden={(action==='reset password' || action==='verify-code')}>
          <label htmlFor="phone-number">Phone Number<span>(0785678977)</span>:</label>
          <input type="tel" onChange={handleChange} className="form-control" id="phone-number" name="phoneNumber" pattern="[0]{1}[0-9]{9}" />
        </div>
        <div className="form-group" hidden={!(action==='verify-code')}>
          <label htmlFor="code">Verification Code:</label>
          <input type="number"  onChange={handleChange} className="form-control" id="code" />
        </div>
        <div className="form-group" hidden={(action==='verify'  || action==='verify-code')}>
          <label htmlFor="pwd">Password:</label>
          <input type="password" onChange={handleChange} name='password' className="form-control" id="pwd" />
        </div>
        <div className="form-group" hidden={!(action==='reset password')}>
          <label htmlFor="cpwd">Confirm Password:</label>
          <input type="password" onChange={handleChange} name="confirmPassword" className="form-control" id="cpwd" />
        </div>
        <div className="forgot-pwd"  hidden={!(action==='login')}>
          <Link to="#">Forgot Password?</Link>
        </div>
        <div className="new-member"  hidden={!(action==='login')}>
          <Link to="/verify">New Member?<span> Verify Your Account</span></Link>
        </div>
        <Button
          text='Submit'
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};

export default AuthForm;
