import React from 'react';

const Spinner = ({center}) => {
  const className = center?'spinner center-spinner':'spinner';
  
  return (
    <div className={className}>
      <span> <span className="spinner-border" role="status" aria-hidden="true" ></span>
       Loading...</span>
    </div>
  );
};

export default Spinner;
