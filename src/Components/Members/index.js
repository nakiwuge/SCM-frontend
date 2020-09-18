import React,{useState,useEffect} from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import AddMember from './AddMember';
import { getUsers } from '../../Actions/Users';
import Table from '../Common/Table';
import Spinner from '../Common/Spinner';
import usePrevious from '../Hooks/usePrevious';
import useHandleToggle from '../Hooks/useHandleToggle';

const Members = ({getUsers,users}) => {
  const tableHeaders = ['First Name', 'Email', 'Phone Number', 'Account Balance', 'Role'];
  const [isLoading, setLoader]= useState(false);
  const [toggle,setToggle,handleToggle] = useHandleToggle();

  const prevUsers = usePrevious(users);

  const fetchUsers = async()=>{
    setLoader(true);
    await getUsers();
    setLoader(false);
  };

  useEffect(()=>{
    if(!_.isEqual(prevUsers,users)){
      fetchUsers();
    }
  }, [users]);

  const renderTableData =data=>{
    return (data.map((result,index)=>(
      <tr key={index}>
        <td>{result.first_name}</td>
        <td>{result.email}</td>
        <td>{result.phone_number}</td>
        <td>{result.account_balance}</td>
        <td>{result.role_name}</td>
      </tr>
    )));
  };

  return (
    <div className="members">
      <section>
        <div className="header">
          <h1>Members</h1>
          <button  onClick={handleToggle}>Add Member</button>
        </div>
        {isLoading
          ?<Spinner center={true} />
          :users&&
        <div>
          <Table
            headers={tableHeaders}
            renderContent={renderTableData(users)}
          />
        </div>
        }
        {toggle
        &&<AddMember
          toggle={toggle}
          handleToggle={handleToggle}
        />}
      </section>
    </div>
  );
};

const mapStateToProps = (state )=> {
  return{
    users:  state.userReducer.users,
  };
};

export default connect(mapStateToProps, {getUsers})(Members);
