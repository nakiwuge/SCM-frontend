export const isRequired =(data)=>{
  let error;

  Object.keys(data).forEach((key)=>{
    if(data[key].trim().length<1){
      error = `${key} is required`;
    }
  });
  return error;
};

export const isEmail=(email)=>{
  const re = /^\S+@\S+\.\S+$/;

  if (!email.match(re)){
    return 'Invalid Email';
  }
};

export const currency = (string)=>{
  const toNumber = string&&parseInt(string.replace(/\D/g, ''));

  if(isNaN(toNumber)){
    return '';
  }

  return toNumber.toLocaleString();
};
