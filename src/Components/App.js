import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import './../Assets/styles/main.scss';
import Home from  './Home';
import Auth from './Auth/Auth';
import VerifyPhoneNumber from  './Auth/VerifyPhoneNumber';
import ResetPassword from  './Auth/ResetPassword';
import VerifyCode from './Auth/VerifyCode';
import ProtectedRoute from './Protected/ProtectedRoute';
import Layout from './Common/Layout';

export const NotFound = () => (
  <section>
    <h1>Page Not Found</h1>
  </section>
);

const App = ({location, history}) => {

  return (
    <Router>
      <Layout>
        <Switch>
          <ProtectedRoute exact path="/" location={location} history={history} component={Home}  />
          <Route exact path="/login" component={Auth} />
          <Route exact path="/verify" component={VerifyPhoneNumber} />
          <Route exact path="/verify-code" component={VerifyCode} />
          <Route exact path="/password-reset" component={ResetPassword} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default withRouter(App);
