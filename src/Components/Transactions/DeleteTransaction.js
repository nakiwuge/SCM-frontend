import React from 'react';
import { connect } from 'react-redux';
import {Popconfirm} from 'antd';
import { DeleteOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import { deleteTransaction } from '../../Actions/Transactions';

const DeleteTransaction = ({deleteTransaction,id}) => {
  const handleDelete  = ()=>{
    deleteTransaction(id);
  };

  return (
    <Popconfirm
      title="Are you sure delete this transaction?"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={handleDelete}
      okText="Delete"
    >
      <DeleteOutlined style={{ color: 'red' }}/>
    </Popconfirm>
  );
};

const mapStateToProps = ({userReducer,transactionReducer} )=> ({
  transaction:  transactionReducer.transaction,
  users: userReducer.users,
  errorResponse:transactionReducer.error
});

const mapDispatchToProps = {
  deleteTransaction
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTransaction);
