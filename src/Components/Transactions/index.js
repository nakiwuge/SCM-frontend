import React from 'react';
import {Link} from 'react-router-dom';
import Restricted from '../Protected/Restricted';

const Transactions = () => {
  return (
    <div className="transaction">
      <section>
        <div className="header">
          <h1>Transactions</h1>
          <button className="add-btn">Add Transaction</button>
        </div>
      </section>
    </div>
  );
};

export default  Transactions;
