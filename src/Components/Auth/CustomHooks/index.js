import { isRequired } from '../../../Helpers/validation';

export const useHandleChange = (setError,setFunc,data=null,multFields=null)=>{

  const handleChange =({target})=>{

    setError(null);
    if(multFields){
      return setFunc({
        ...data,
        [target.name]:target.value
      });
    }
    setFunc(target.value);
  };

  return [handleChange];
};

export const useHandleSubmit = (data,setLoader,setError,actionFunc)=>{
  const handleSubmit=async(event)=>{
    event.preventDefault();
    const validate = isRequired(data);

    if(validate){
      return setError(validate);
    }

    setLoader(true);
    await actionFunc(data);
    setLoader(false);
  };

  return [handleSubmit];
};
