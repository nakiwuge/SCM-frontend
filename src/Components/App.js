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
import { getUser } from '../Actions/Auth';

export const NotFound = () => (
  <section>
    <h1>Page Not Found</h1>
  </section>
);

export const UserContext = React.createContext({
  currentUser: null,
});
const App = ({location, history,getUser,currentUser}) => {

  const fetchUser = async()=>{
    const user = await authService.decodeToken();
    if(user){
      getUser(user.id);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={currentUser}>
        <Layout>
          <Switch>
            <ProtectedRoute exact path="/" currentUser={currentUser} location={location} history={history} component={Home} />
            <Route exact path="/login" component={Auth} />
            <Route exact path="/verify" component={VerifyPhoneNumber} />
            <Route exact path="/verify-code" component={VerifyCode} />
            <Route exact path="/password-reset" component={ResetPassword} />
            <ProtectedRoute exact currentUser={currentUser} path="/transactions" component={Transactions} location={location} history={history}/>
            <ProtectedRoute exact currentUser={currentUser} path="/members"location={location} history={history} component={Members} role={['admin']}/>
            <ProtectedRoute currentUser={currentUser} location={location} history={history}component={NotFound} />
          </Switch>
        </Layout>
      </UserContext.Provider>
    </Router>
  );
};
const mapStateToProps = ({AuthReducer} )=> ({
  currentUser:  AuthReducer.currentUser,
});

export default withRouter(connect(mapStateToProps, {getUser})(App));
