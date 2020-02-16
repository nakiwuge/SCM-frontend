import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Restricted from '../Protected/Restricted';
import Modal from '../Common/Modal';
import AddMember from './AddMember';
import { getRoles } from '../../Actions/Roles';
const Bar = React.memo(function Bar({name}) {  return <h1>{name}</h1>;});

const Members = ({getRoles,roles}) => {
  const [toggle, setToggle]=useState(false);

  const handleToggle=()=>{
    setToggle(!toggle);
  };
  
  return (
    <div className="members">
      <section>
        <div className="header">
          <h1>Members</h1>
          <button className="add-btn" onClick={handleToggle}>Add Member</button>

        </div>
        {toggle
        &&<AddMember
          toggle={toggle}
          handleToggle={handleToggle}
        />}
      </section>
    </div>
  );
};

const mapStateToProps = ({rolesReducer} )=> ({
  roles:  rolesReducer.roles,
});

export default connect(mapStateToProps, {})(Members);
