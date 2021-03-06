import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import Modal from '../Common/Modal';
import Select from '../Common/Select';
import { isRequired, isEmail, currency } from '../../Helpers/validation';
import { getRoles } from '../../Actions/Roles';
import { addUser, getUsers } from '../../Actions/Users';
import { resetError } from '../../Actions/Transactions';

import withHandleChange from '../HOC/withHandleChange';

const AddMember = ({
  toggle,
  handleToggle,
  getRoles,
  resetError,
  roles,
  addUser,
  user,
  errorResponse,
  data,
  handleChange,
  error,
  setError
}) => {
  const [isLoading, setLoader] = useState(false);
  const [prev, setPrev] = useState(user?.id);

  useEffect(()=>{
    getRoles();
  },[]);

  useEffect(()=>{
    if(errorResponse){
      setError(errorResponse);
    }
  },[errorResponse]);

  useEffect(()=>{
    if(user?.id !== prev){
      handleToggle();
    }
    return () => {
      resetError();
    };

  },[user]);

  const handleSubmit =async (event)=>{
    event.preventDefault();
    const validate = isRequired(data);
    const validateEmail = isEmail(data.email);
    const userData = {...data, accountBalance:data.accountBalance.replace(/,/g,'')};

    if(validate){
      return setError(validate);
    }

    if(validateEmail){
      return setError(validateEmail);
    }

    setLoader(true);
    await addUser(userData);

    setLoader(false);
  };

  const renderContent =()=>{
    return <React.Fragment>
      <div className="form-group" >
        <label htmlFor="email">Email:</label>
        <input type="text" onChange={handleChange} name="email" className="form-control" id="email" />
      </div>
      <div className="form-group phone" >
        <label htmlFor="phone-number">Phone Number<span>(0785678977)</span>:</label>
        <input type="tel" onChange={handleChange} className="form-control" id="phone-number" name="phoneNumber" pattern="[0]{1}[0-9]{9}" />
      </div>
      <div className="form-group balance"  >
        <label htmlFor="acc">Account Balance<span>(UGX)</span>:</label>
        <input type="text" name="accountBalance" value={currency(data.accountBalance)} onChange={handleChange} className="form-control" id="acc" />
      </div>
      <Select data={roles} handleChange={handleChange} title="Role" name="role"/>
    </React.Fragment>;
  };

  return (
    <div className="add-form">
      <Modal
        title="Add a Member"
        open={toggle}
        content={renderContent()}
        handleToggle={handleToggle}
        handleSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};
const formData = {
  email:'',
  phoneNumber:'',
  accountBalance:'',
  role:''
};

const mapStateToProps = ({rolesReducer,userReducer} )=> ({
  roles:  rolesReducer.roles,
  user: userReducer.user,
  users: userReducer.users,
  errorResponse:userReducer.error
});

const mapDispatchToProps = {
  getRoles,
  addUser,
  getUsers,
  resetError
};

export default connect(mapStateToProps, mapDispatchToProps)(withHandleChange(AddMember,formData));

