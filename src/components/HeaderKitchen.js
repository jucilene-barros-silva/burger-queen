import React from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import Logo from '../img/logo.svg';

const Header = ( children,...props) => {  

  function logout(e) {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = '/';
      })
      .catch(console.error);
  };
  
  return (
  <nav className="header"> 
    <img src={Logo} alt="Logomarca" />
    <div>
    {/* <NavLink to="hall"><Button name="salao" /></NavLink> */}
    <NavLink to="/kitchen"><Button name="Cozinha" /></NavLink>
    <NavLink to="/"><Button name="Logout" onClick={logout} /></NavLink>
    {props.children}
    </div>
  </nav>
  )
}
export default Header;