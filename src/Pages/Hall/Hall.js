import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header.js';
import Button from '../../Components/Button.js';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import './Hall.css';



function Hall() {
  const [menu, setMenu] = useState([]);
  const [brackfast, setBrackfast] = useState(false);
  const [meal, setMeal] = useState(false);

  useEffect(() => {
    firebase.firestore().collection('menu')   
    .onSnapshot(itens => {
          const arrayItens =[];
          itens.forEach((item) => arrayItens.push(item.data()))   
          setMenu(arrayItens)          
        })       
}, []);




  return (

    <div>
      <Header />
      <h1>Salão</h1>
      
          {menu.map((item)=><div className='card'>{item.item} {item.value} <br /></div>)}
      
      <Button name='Café da manhã' />
    </div>
  )
}

export default Hall;
