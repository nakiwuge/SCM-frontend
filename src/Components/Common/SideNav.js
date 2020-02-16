import React from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../App';

const SideNav = () => {
  return (
    <div className="side-nav">
      <UserContext.Consumer>
        {user => (
          <section>
            <ul>
              <Link to='/'>
                <li><span className="icon"><i className="fa fa-home"></i></span>Home</li>
              </Link>
              <Link to='/transactions'>
                <li><span className="icon"><i className="fa fa-money" aria-hidden="true"></i></span>Transactions</li>
              </Link>
              <Link to='/members'>
                <li><span className="icon"><i className="fa fa-users" aria-hidden="true"></i></span>Members</li>
              </Link>
            </ul>
          </section>
        )}
      </UserContext.Consumer>
    </div>
  );
};

export default SideNav;
