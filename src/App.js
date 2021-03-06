import React, { useEffect, useState } from 'react';
import './App.css';
import Login from '../src/Pages/Login/Login.js';
import Register from '../src/Pages/Register/Register.js';
import Default from '../src/Pages/Default/Default.js';
import Hall from '../src/Pages/Hall/Hall.js';
import Kitchen from '../src/Pages/Kitchen/Kitchen.js';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import firebase from './Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import OrderStatus from '../src/Pages/OrderStatus/OrderStatus.js';

export default function App() {
  const navigate = useNavigate;
  const [loggedIn, setLoggedIn] = useState([]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user
        ? firebase
            .firestore()
            .collection('employeer')
            .where('userUid', '==', user.uid)
            .onSnapshot((querySnapshot) => {
              querySnapshot.forEach((doc) => setLoggedIn(doc.data()));
            })
        : setLoggedIn();
    });
  }, []);

  return (
    <BrowserRouter>
      {loggedIn ? <navigate to={loggedIn.occupation} /> : <navigate to={'/'} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hall" element={<Hall />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/hall/orderstatus" element={<OrderStatus />} />
        <Route path="*" element={<Default />} />
      </Routes>
    </BrowserRouter>
  );
}
