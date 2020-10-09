import React, {useState, useEffect}from 'react';
import { connect } from 'react-redux';
import {PageHeader} from 'antd';
import _ from 'underscore';
import Table from '../Common/Table';
import Spinner from '../Common/Spinner';
import { getTransactions } from '../../Actions/Transactions';
import usePrevious from '../Hooks/usePrevious';
import { formatDate } from '../../Helpers/formatDate';
import { authService } from '../../Helpers/auth';

const UserTransactions = ({getTransactions,transactions}) => {
  const tableHeaders = ['Amount', 'Transaction Type','Date'];
  const [isLoading, setLoader]= useState(false);

  const prevUsers = usePrevious(transactions);

  const fetchUsers = async()=>{
    const currentUser = authService.decodeToken();
    setLoader(true);
    await getTransactions(currentUser?.id);
    setLoader(false);
  };

  useEffect(()=>{

    if(!_.isEqual(prevUsers,transactions)){
      fetchUsers();
    }

  }, [transactions]);

  const renderTableData =data=>{
    return (data.map((result,index)=>(
      <tr key={index}>
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
          title="My Transactions"
        >
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

export default connect(mapStateToProps, mapDispatchToProps)(UserTransactions);
