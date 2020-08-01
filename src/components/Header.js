import React from 'react';
import Button from './Button';
import Logo from './Logo.js';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
  <nav className="header">
    <Logo />
    <NavLink to="salao"><Button name="salao" /></NavLink>
    <NavLink to="cozinha"><Button name="Cozinha" /></NavLink>
    <NavLink to="logout"><Button name="Logout" /></NavLink>
  </nav>
  )
}
export default Header;
