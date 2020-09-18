import React from 'react';
import { authService } from '../../Helpers/auth';

const Restricted = ({children, roles}) => {
  const user = authService.decodeToken();

  return (
    <>
      {roles.includes(user?.role?.name) && children}
    </>
  );
};

export default Restricted;
