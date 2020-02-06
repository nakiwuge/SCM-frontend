import React, { useEffect, Component} from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';
import { authService } from '../../Helpers/auth';
import { getUser } from '../../Actions/Auth';

class ProtectedRoute extends Component {

  async componentDidMount(){
    const user = await authService.decodeToken();
    if(user){
      this.props.getUser(user.id);
    }
  }

  render(){
    const { component: Component,currentUser, ...props} = this.props;

    if (currentUser && props.role){
      const isAuthorized = props.role.includes(currentUser.role_name);
      if(!isAuthorized){
        return <Redirect to='/'/>;
      }
    }

    return (
      <Route
        {...props}
        render={  props =>{
          return authService.isAuthenticated()
            ? <Component {...props} /> :authService.redirectUser();}
        }
      />
    );
  }
}
const mapStateToProps = ({AuthReducer} )=> ({
  currentUser:  AuthReducer.currentUser,
});

export default connect(mapStateToProps, {getUser})(ProtectedRoute);
