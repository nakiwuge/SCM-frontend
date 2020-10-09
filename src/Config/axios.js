export const config = ()=>{
  const token = localStorage.getItem('jwt');
  return {headers: {
    'Authorization' : `Bearer ${token}`
  }};
};

