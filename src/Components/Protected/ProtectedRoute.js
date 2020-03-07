import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';
import { authService } from '../../Helpers/auth';
import { getUser } from '../../Actions/Users';

class ProtectedRoute extends Component {

  render(){
    const { component: Component,currentUser, ...props} = this.props;

    if (currentUser && props.roles ){
      const isAuthorized = props.roles.includes(currentUser.role_name);
      if(!isAuthorized){
        return <Redirect to='/'/>;
      }
    }

    return (
      <React.Fragment>
        <Route
          {...props}
          render={  props =>{
            return authService.isAuthenticated()
              ?  <Component {...props} />  :<Redirect to='/login'/>;}
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, {getUser})(ProtectedRoute);
