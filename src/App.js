import React from 'react';
import './App.css';
import Login from '../src/Pages/Login/Login.js'
import Register from '../src/Pages/Register/Register.js';
import Default from '../src/Pages/Default/Default.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cozinha from './Pages/Cozinha/Cozinha.js'
import Salao from './Pages/Salao/Salao.js'

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="register" element={<Register />}/>
        <Route path="salao" element={<Salao />}/>
        <Route path="cozinha" element={<Cozinha />}/>
        <Route path="*" element={<Default />}/>
      </Routes>    
    </BrowserRouter>
    )
  }
export default App;
