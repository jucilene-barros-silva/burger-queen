import React, {useState} from 'react';
import Header from '../../Components/Header.js';
import Button from '../../Components/Button.js';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import './Hall.css';

function Hall() {
  
 
//   useEffect(() => {
//     firebase.firestore().collection('menu')   
//     .onSnapshot(itens => {
//           const arrayItens =[];
//           itens.forEach((item) => arrayItens.push(item.data()))   
//           setMenu(arrayItens);           
//         })       
// }, []);


const [menu, setMenu] = useState([]);

const getBreakfast = () => {  
  firebase.firestore().collection('menu')   
  .onSnapshot(itens => {
        const arrayItens =[];
        itens.forEach((item) => { 
          if(item.data().breakfast === "true") {
            arrayItens.push(item.data()) 
          }           
          console.log(arrayItens);  
           setMenu(arrayItens);
                       
          }   
                     
  )})
}


  return (

     <div>
       <Header />
      <h1>Salão</h1>
      
          {menu.map((item)=><div className='card'>{item.item} {item.value} <br /></div>)}
      
      <Button name='Café da manhã' onClick={getBreakfast()} />
      <Button name='All Day' onClick={getBreakfast} />
         </div>
  )
}

export default Hall;
