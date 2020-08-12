import React from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';

const Header = () => {  

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
    <NavLink to="kitchen"><Button name="Cozinha" /></NavLink>
    {/* <NavLink to="PendingOrders"><Button name="Pendentes" /></NavLink> */}
    <NavLink to="PreparingOrders"><Button name="Cozinha" /></NavLink>

    <NavLink to="/"><Button name="Logout" onClick={logout}/></NavLink>
  </nav>
  )
}
export default Header;
