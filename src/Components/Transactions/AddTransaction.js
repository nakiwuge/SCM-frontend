import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import Modal from '../Common/Modal';
import Select from '../Common/Select';
import { isRequired,  currency } from '../../Helpers/validation';
import { getUsers } from '../../Actions/Users';
import AutoCompleteInput from '../Common/AutoCompleteInput';
import { addTransaction,resetError } from '../../Actions/Transactions';

const AddTransation = ({
  toggle,
  handleToggle,
  users,
  getUsers,
  addTransaction,
  transaction,
  errorResponse,
  resetError
}) => {
  const [data, setData]=useState({
    user:'',
    type:'',
    amount:'',
  });
  const[showAutoData, setShowAutoData]=useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setLoader] = useState(false);
  const [autoData, setAutoData]= useState(null);
  const [prev, setPrev] = useState(transaction?.id);

  useEffect(()=>{
    getUsers();
  },[]);

  useEffect(()=>{
    if(errorResponse){
      setError(errorResponse);
    }
  },[errorResponse]);

  useEffect(()=>{
    if(data?.user !==''){
      getAutoData(data?.user);
    }
  },[data?.user]);

  useEffect(()=>{
    if(prev!==transaction?.id){
      handleToggle();
    }
    return () => {
      resetError(); 
    };
  },[transaction]);

  const handleChange =({target})=>{
    const { name, value} = target;

    setError(null);
    if(name ==='user'){
      setShowAutoData(true);
      setData({...data,user:value});
    }else{
      setShowAutoData(false);
      setData({
        ...data,
        [name]:value
      });
    }
  };

  const getAutoData = (data)=>{
    const autoData = users.filter((res)=>{
      return res.email.includes(data);
    });

    setAutoData(autoData);
  };

  const handleSubmit =async (event)=>{
    event.preventDefault();
    const validate = isRequired(data);
    const user = users.find(res=>res.email===data.user);
    const transData = {
      ...data,
      amount:data?.amount.replace(/,/g,''),
      user:user?.id
    };

    if(validate){
      return setError(validate);
    }

    setLoader(true);
    await addTransaction(transData);
    setLoader(false);
  };

  const handleAutoDataSelect=({target})=>{
    setData({...data,user:target.getAttribute('value')});
    setShowAutoData(false);
  };

  const renderContent =()=>{
    return <React.Fragment>
      <div className="form-group autocomplete">
        <AutoCompleteInput
          showItems={showAutoData}
          handleChange={handleChange}
          label='User Email'
          name="user"
          placeholder="user@gmail.com"
          value={data.user}
        >
          {autoData&&autoData.map((res,index)=>(<p onClick={handleAutoDataSelect} value={res.email}key={index}>{res.email}</p>))}
        </AutoCompleteInput>

      </div>
      <Select data={['Deposit','Fine']} handleChange={handleChange} title="Transaction Type" name="type"/>
      <div className="form-group balance"  >
        <label htmlFor="amount">Amount<span>(UGX)</span>:</label>
        <input type="text" name="amount" value={currency(data.amount)} onChange={handleChange} className="form-control" id="amount" />
      </div>
    </React.Fragment>;
  };

  return (
    <div className="add-form">
      <Modal
        title="Add a Transaction"
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

const mapStateToProps = ({userReducer,transactionReducer} )=> ({
  transaction:  transactionReducer.transaction,
  users: userReducer.users,
  errorResponse:transactionReducer.error
});

const mapDispatchToProps = {
  addTransaction,
  getUsers,
  resetError,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransation);
