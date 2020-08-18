import React from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import Logo from '../img/logo.svg';

const Header = (name, ...props) => {
  function logout(e) {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = '/';
      })
      .catch(console.error);
  }

  return (
    <nav className="header">
      <img src={Logo} alt="Logomarca" />
      <div className= "button-container">
        <NavLink to="/kitchen">
          <Button color="primary" name="Pedidos" />
        </NavLink>
        <NavLink to="/">
          <Button color="secondary" name="Logout" onClick={logout} />
        </NavLink>
        {props.name}
      </div>
    </nav>
  );
};
export default Header;
