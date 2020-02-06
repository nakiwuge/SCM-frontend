import React from 'react';
import {Link} from 'react-router-dom';
import { authService } from '../../Helpers/auth';
 import Restricted from './Protected/Restricted';

const TopNav = () => {
  return (
    <div className="top-nav">
      <nav className="navbar navbar-inverse fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">D17 Savings Club</a>
            {/* <span className="menu"><i className="fa fa-bars"></i></span> */}
          </div>
          <ul className="nav navbar-nav navbar-right" hidden={!authService.isAuthenticated()}>
            <li><a href="#"><span className="glyphicon glyphicon-user"></span> Profile</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
