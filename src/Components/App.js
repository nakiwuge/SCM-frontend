import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import './../Assets/styles/main.scss';
import Home from  './Home';
import Auth from './Auth/Auth';
import VerifyPhoneNumber from  './Auth/VerifyPhoneNumber';
import ResetPassword from  './Auth/ResetPassword';

export const NotFound = () => (
  <h1>Page Not Found</h1>
);

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/verify" component={VerifyPhoneNumber} />
        <Route exact path="/password-reset" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default withRouter(App);
