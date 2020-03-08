import React from 'react';
import {Link} from 'react-router-dom';
import { authService } from '../../Helpers/auth';


const TopNav = ({handleToggle}) => {
  return (
    <div className="top-nav">
      <nav className="navbar navbar-inverse fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <span id="menu"onClick={handleToggle}><i className="fa fa-bars" aria-hidden="true"></i></span>
            <a className="navbar-brand" href="#">D17 <span>Savings Club</span></a>
          </div>
          <ul className="nav" hidden={!authService.isAuthenticated()}>
            <li ><a href="#"><span className="glyphicon glyphicon-user"></span> Profile</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
