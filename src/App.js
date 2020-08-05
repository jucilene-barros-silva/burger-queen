import React, { useEffect, useState } from 'react';
import './App.css';
import Login from '../src/Pages/Login/Login.js'
import Register from '../src/Pages/Register/Register.js';
import Default from '../src/Pages/Default/Default.js';
import Hall from '../src/Pages/Hall/Hall.js';
import Kitchen from '../src/Pages/Kitchen/Kitchen.js';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

export default function App() {
  

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/> 
        <Route path='/hall' element={<Hall/>}/> 
        <Route path='/kitchen' element={<Kitchen/>}/>
        <Route path="*" element={<Default />}/>
      </Routes>
    </BrowserRouter>
  );
}
