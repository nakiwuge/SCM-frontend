export const isRequired =(data)=>{
  let error;

  Object.keys(data).forEach((key)=>{
    if(data[key].trim().length<1){
      error = `${key} is required`;
    }
  });
  return error;
};
