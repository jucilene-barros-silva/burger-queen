import React from 'react';
import Button from './Button';
import Logo from './Logo.js'

const Header = () => {
  return (
  <nav className="header">
    <Logo />
    <li><Button name="Salão" /></li>
    <li><Button name="Cozinha" /></li>
    <li><Button name="Logout" /></li>
  </nav>
  )
}

export default Header;
