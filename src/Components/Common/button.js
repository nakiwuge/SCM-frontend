import React from 'react';
import Spinner from './Spinner';

const Button = ({isLoading, text, className}) => {
  return (
    <div className="button">
      <button type="submit" className={className?className:'btn btn-primary'}>
        {isLoading?<Spinner/> : text}
      </button>
    </div>
  );
};

export default Button;
