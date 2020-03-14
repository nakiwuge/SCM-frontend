import React, {useState} from 'react';
import TopNav from './TopNav';
import { withRouter } from 'react-router-dom';
import Footer from './Footer';
import SideNav from './SideNav';

const LayOut = ({location,children}) => {
  const { pathname } = location;
  const urls = ['/login', '/verify','/verify-code','/password-reset'];
  const [toggle, setToggle]=useState(false);

  const handleToggle = ()=>{
    setToggle(!toggle);
  };

  const sideNavClass = toggle?'menu':'col-lg-2 nav-left';

  return (
    <div  className="container-fluid layout">
      <div className="row" hidden={pathname=='/login'}>
        <TopNav handleToggle={handleToggle}/>
      </div>
      <div className="row" >
        <div  className={sideNavClass} hidden={(urls.includes(pathname))}>
          <SideNav/>
        </div>
        <div className="col-lg-10  content">
          {children}
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default withRouter(LayOut);
