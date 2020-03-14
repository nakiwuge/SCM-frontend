import React, {useState, useEffect}from 'react';

const withHandleChange = (WrappedComponent,formData) =>{
  const  WithHandleChange =(props)=>{
    const [data, setData]=useState(formData);
    const [error, setError] = useState(null);

    const  handleChange =({target})=>{
      const { name, value} = target;
      setError(null);
      setData({
        ...data,
        [name]:value
      });
    };

    return (
      <WrappedComponent
        handleChange={handleChange}
        error={error}
        data={data}
        setData={setData}
        setError={setError}
        {...props}
      />
    );
  };

  return WithHandleChange;
};

export default withHandleChange;
