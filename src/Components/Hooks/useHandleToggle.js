import {useState} from 'react';

const useHandleToggle= () =>{
  const [toggle, setToggle]=useState(false);
  const handleToggle=()=>{
    setToggle(!toggle);
  };

  return [toggle,setToggle,handleToggle];
};

export default useHandleToggle;
