import React, { Component} from 'react';
import { Route, Redirect} from 'react-router-dom';
import { authService } from '../../Helpers/auth';

class ProtectedRoute extends Component {

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
            ?  <Component {...props} />  :<Redirect to='/login'/>;}
        }
      />
    );
  }
}

export default ProtectedRoute;
