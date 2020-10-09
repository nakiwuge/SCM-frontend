export const config = async()=>{
  const token = localStorage.getItem('jwt');
  return {headers: {
    'Authorization' : `Bearer ${token}`
  }};
};

