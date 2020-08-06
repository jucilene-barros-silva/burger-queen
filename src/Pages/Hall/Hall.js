import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header.js';
import Button from '../../Components/Button.js';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import './Hall.css';



function Hall() {
  const [menu, setMenu] = useState([]);
  const [breakfast, setBreakfast] = useState(false);
  const [meal, setMeal] = useState(false);

  useEffect(() => {
    firebase.firestore().collection('menu')   
    .onSnapshot(itens => {
          const arrayItens =[];
          itens.forEach((item) => arrayItens.push(item.data()))   
          setMenu(arrayItens)          
        })       
}, []);

function openBreakfast(){
  setBreakfast(true)
  setMeal(false)
}
function openMeal(){
  setBreakfast(false)
  setMeal(true)
}


  return (

    <div>
      <Header />
      <h1>Salão</h1>
      
      
          {breakfast && menu.filter((item)=>item.breakfast=== true).map((item)=><div className='card'>{item.item} {item.value} <br /></div>)}
          {meal && menu.filter((item)=>item.breakfast=== false).map((item)=><div className='card'>{item.item} {item.value} <br /></div>)}
          

      <Button name='Café da manhã' onClick={openBreakfast}/>
      <Button name='Refeição' onClick={openMeal}/>
    </div>
  )
}

export default Hall;
