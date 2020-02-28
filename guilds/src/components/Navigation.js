import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <NavLink to='/Home'>Home</NavLink>
      <NavLink to='Login'>Login</NavLink>
      <NavLink to='/Signup'>Sign up</NavLink>
    </div>
  );
};
export default Navigation;
