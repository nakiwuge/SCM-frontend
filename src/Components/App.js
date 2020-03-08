import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './../Assets/styles/main.scss';
import Home from  './Home';
import Auth from './Auth/Auth';
import VerifyPhoneNumber from  './Auth/VerifyPhoneNumber';
import ResetPassword from  './Auth/ResetPassword';
import VerifyCode from './Auth/VerifyCode';
import ProtectedRoute from './Protected/ProtectedRoute';
import Layout from './Common/Layout';
import Transactions from './Transactions';
import Members from './Members';
import { authService } from '../Helpers/auth';
import { getUser } from '../Actions/Users';

export const NotFound = () => (
  <section>
    <h1>Page Not Found</h1>
  </section>
);

export const UserContext = React.createContext({
  currentUser: null,
});
class App extends React.Component  {
  async componentDidMount(){
    const user = await authService.decodeToken();

    if(user){
      this.props.getUser(user.id);
    }
  }

  render(){
    return (
      <UserContext.Provider value={this.props.currentUser}>
        <Router>
          <Layout>
            <Switch>
              <ProtectedRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Auth} />
              <Route exact path="/verify" component={VerifyPhoneNumber} />
              <Route exact path="/verify-code" component={VerifyCode} />
              <Route exact path="/password-reset" component={ResetPassword} />
              <ProtectedRoute exact  path="/transactions" component={Transactions}/>
              <ProtectedRoute exact  path="/members" component={Members} roles={['admin']}/>
              <ProtectedRoute component={NotFound} />
            </Switch>
          </Layout>
        </Router>
      </UserContext.Provider>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser,
});

export default  withRouter(connect(mapStateToProps, {getUser})(App));
