import React from 'react';
import TopNav from './TopNav';
import { withRouter } from 'react-router-dom';
import Footer from './Footer';
import SideNav from './SideNav';
import { authService } from '../../Helpers/auth';

const LayOut = ({location,children}) => {
  const { pathname } = location;
  const urls = ['/login', '/verify','/verify-code','/password-reset'];

  return (
    <div  className="container-fluid layout">
      <div className="row" hidden={pathname=='/login'}>
        <TopNav/>
      </div>
      <div className="row ">
        <div className="col-lg-2  sticky-top nav-left" hidden={(urls.includes(pathname))}>
          <SideNav/>
        </div>
        <div className="col-lg-10 content">
          {children}
          <div hidden={!authService.isAuthenticated()}>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LayOut);
