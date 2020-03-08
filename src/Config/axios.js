export const config = async()=>{
  const token = await localStorage.getItem('jwt');
  return {headers: {
    'Authorization' : `Bearer ${token}`
  }};
};

