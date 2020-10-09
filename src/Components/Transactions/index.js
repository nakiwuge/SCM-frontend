import React, {useState, useEffect}from 'react';
import { connect } from 'react-redux';
import {Button,PageHeader} from 'antd';
import _ from 'underscore';
import Table from '../Common/Table';
import Spinner from '../Common/Spinner';
import { getTransactions } from '../../Actions/Transactions';
import usePrevious from '../Hooks/usePrevious';
import { formatDate } from '../../Helpers/formatDate';
import AddTransaction from './AddTransaction';
import useHandleToggle from '../Hooks/useHandleToggle';

const Transactions = ({getTransactions,transactions}) => {
  const tableHeaders = ['First Name', 'Email', 'Amount', 'Transaction Type','Date'];
  const [isLoading, setLoader]= useState(false);
  const [toggle,setToggle,handleToggle] = useHandleToggle();

  const prevUsers = usePrevious(transactions);

  const fetchTransactions = async()=>{
    setLoader(true);
    await getTransactions();
    setLoader(false);
  };

  useEffect(()=>{

    if(!_.isEqual(prevUsers,transactions)){
      fetchTransactions();
    }

  }, [transactions]);

  const renderTableData =data=>{
    return (data.map((result,index)=>(
      <tr key={index}>
        <td>{result.first_name}</td>
        <td>{result.email}</td>
        <td>{result.amount}</td>
        <td>{result.type}</td>
        <td>{formatDate(result.created_at)}</td>
      </tr>
    )));
  };

  return (
    <div className="transactions">
      <section>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Transactions"
          extra={[
            <Button key="1" type="default" onClick={handleToggle} size="large">
          Add Transaction
            </Button>    
          ]}>
        </PageHeader>
        {isLoading
          ?<Spinner center={true} />
          :transactions&&
        <div>
          <Table
            headers={tableHeaders}
            renderContent={renderTableData(transactions)}
          />
        </div>
        }
        {toggle
        &&<AddTransaction
          toggle={toggle}
          handleToggle={handleToggle}
        />}
      </section>
    </div>
  );
};

const mapStateToProps = ({transactionReducer} )=> ({
  transactions: transactionReducer.transactions,
  errorResponse: transactionReducer.error
});

const mapDispatchToProps = {
  getTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
