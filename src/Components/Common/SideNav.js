import React from 'react';
import {Link} from 'react-router-dom';
import Restricted from './Restricted';
import { authService } from '../../Helpers/auth';

const SideNav = () => {
  const logout = ()=>{
    authService.logoutUser();
  };

  return (
    <div className="side-nav ">
      <section>
        <ul>
          <Link to='/'>
            <li><span className="icon"><i className="fa fa-home"></i></span>Home</li>
          </Link>
          <Link to='/my-transactions'>
            <li><span className="icon"><i className="fa fa-money" aria-hidden="true"></i></span>My Transactions</li>
          </Link>
          <Restricted roles={['admin','superAdmin']}> 
            <Link to='/transactions'>
              <li><span className="icon"><i className="fa fa-money" aria-hidden="true"></i></span>All Transactions</li>
            </Link>
          </Restricted>  
          <Restricted roles={['admin','superAdmin']}>  
            <Link to='/members'>
              <li><span className="icon"><i className="fa fa-users" aria-hidden="true"></i></span>Members</li>
            </Link>
          </Restricted>
          <a href="#">
            <li onClick={()=>logout()}><span className="icon"><i className="fa fa-users" aria-hidden="true"></i></span>Logout</li>
          </a>
        </ul>
      </section>
    </div>
  );
};

export default SideNav;
