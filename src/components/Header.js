import React from 'react';
import Button from './Button';
import { NavLink, useNavigate} from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';

const Header = () => {
  const navigate = useNavigate();

  function logout(e) {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/')
      })
      .catch(console.error);
  };

  return (
  <nav className="header">
    
    <NavLink to="salao"><Button name="salao" /></NavLink>
    <NavLink to="cozinha"><Button name="Cozinha" /></NavLink>
    <NavLink to="logout"><Button name="Logout" onClick={logout}/></NavLink>
  </nav>
  )
}
export default Header;
