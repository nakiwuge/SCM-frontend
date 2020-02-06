import React , {Component}from 'react';
import { connect } from 'react-redux';
import { authService } from '../../Helpers/auth';
import { getUser } from '../../Actions/Auth';

class Restricted extends Component  {

  render(){
    const { children , roles, currentUser} = this.props;
    let isAuthorized;

    if (currentUser){
      isAuthorized = roles.includes(currentUser.role_name);
    }

    return (
      <div hidden = {!isAuthorized}>
        {children}
      </div>
    );}
}

const mapStateToProps = ({AuthReducer} )=> ({
  currentUser:  AuthReducer.currentUser,
});

export default connect(mapStateToProps, {getUser})(Restricted);
