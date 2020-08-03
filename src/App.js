import React from 'react';
// import './App.css';
// import Login from '../src/Pages/Login/Login.js'
// import Register from '../src/Pages/Register/Register.js';
// import Default from '../src/Pages/Default/Default.js';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// function App() {  
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route exact path="/" element={<Login />} />
//         <Route path="register" element={<Register />}/>
//         <Route path="*" element={<Default />}/>
//       </Routes>    
//     </BrowserRouter>
//     )
//   }
// export default App;


import Login from './Pages/Login/Login.js';
import Register from './Pages/Register/Register.js';
import Hall from './Pages/Hall/Hall.js';
import Kitchen from './Pages/Kitchen/Kitchen.js';

export default function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/> 
        <Route path='/hall' element={<Hall/>}/> 
        <Route path='/kitchen' element={<Kitchen/>}/>
        <Route path='*' element={<h1>Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  );


}
