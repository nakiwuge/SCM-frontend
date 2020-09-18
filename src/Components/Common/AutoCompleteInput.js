import React from 'react';

const AutoCompleteInput = ({children,showItems,label,name,handleChange,value,placeholder}) => {
  return (
    <div className="autocomplete">
      <label htmlFor="a-input">{label}:</label>
      <input id="a-input" type="text" name={name} className="form-control" onChange={handleChange} value={value} />
      <div className={showItems?'autocomplete-items':'hide'}>
        {children}
      </div>
    </div>
  );
};

export default AutoCompleteInput;
