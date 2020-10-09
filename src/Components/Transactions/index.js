import React, {useState, useEffect}from 'react';
import { connect } from 'react-redux';
import {Button,PageHeader} from 'antd';
import Table from '../Common/Table';
import Spinner from '../Common/Spinner';
import { getTransactions, undoTransaction } from '../../Actions/Transactions';
import usePrevious from '../Hooks/usePrevious';
import { formatDate } from '../../Helpers/formatDate';
import AddTransaction from './AddTransaction';
import useHandleToggle from '../Hooks/useHandleToggle';
import DeleteTransaction from './DeleteTransaction';

const Transactions = ({getTransactions,transactions,transaction,undoTransaction}) => {
  const tableHeaders = ['First Name', 'Email', 'Amount', 'Transaction Type','Date', 'Action'];
  const [isLoading, setLoader]= useState(false);
  const [isDeleted, setDeleted]= useState(false);

  const [toggle,_,handleToggle] = useHandleToggle();

  const prev = usePrevious(transactions || []);

  const fetchTransactions = async()=>{
    setLoader(true);
    await getTransactions();
    setLoader(false);
  };
  useEffect(()=>{
    if(prev?.length && transactions?.length < prev?.length){
      setDeleted(true);

      setTimeout(()=>{
        setDeleted(false);
      }, 7000);
    }

  }, [transactions]);

  useEffect(()=>{
    if(prev?.length !== transactions?.length || !transactions){
      fetchTransactions();
    }

  }, [transactions]);

  const handleUndo=()=>{
    undoTransaction(transaction?.id);
    setDeleted(false);
  };

  const renderTableData =data=>{
    return (data.map((result,index)=>(
      <tr key={index}>
        <td>{result.first_name}</td>
        <td>{result.email}</td>
        <td>{result.amount}</td>
        <td>{result.type}</td>
        <td>{formatDate(result.created_at)}</td>
        <td><DeleteTransaction id={result.transaction_id}/> </td>
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
        { isDeleted && <div className="alert alert-success alert-dismissible" style={{width:'80%', textAlign:'center'}}>
          <p>
             You have successfully deleted a transaction. &nbsp;
            <strong>
              <a href="#" className="alert-link" onClick={handleUndo}>click here to Undo </a> </strong>
          </p>
        </div>}
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
  transaction: transactionReducer.transaction,
  errorResponse: transactionReducer.error
});

const mapDispatchToProps = {
  getTransactions,
  undoTransaction
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
