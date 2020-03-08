import React from 'react';

const Select = ({data,title,handleChange, name}) => {

  return (
    <div className="form-group">
      <label htmlFor="role">{title}</label>
      <select className="form-control" id="role" name={name} onChange={handleChange}>
        <option key='0' >-- Select {title} --</option>
        {data&&data.map(res=>(
          <option key={res.id} value={res.id}>{res.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
