import React, {useState, useEffect} from 'react';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import '../Hall/Hall.css';
import Button from '../../Components/Button.js';
import Header from '../../Components/Header.js';

const Kitchen = () => {
  const [ order, setOrder ] = useState();
  // const [ preparando, setPreparando] = useState(true);
  // const [ pronto, setPronto] = useState(false);
  
  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .onSnapshot((itens) => {
        const arrayItens = [];
        itens.forEach((item) => {

        const dataItem = item.data();
        dataItem.uid = item.id
        if (dataItem.status === 'Pendente' || dataItem.status === 'Preparando'){
        arrayItens.push(dataItem)
        }
        });
        setOrder(arrayItens);
        console.log(arrayItens)
      });
  }, []);
  
  const changeStatus = (newStatus, index) =>{
     firebase
    .firestore()
    .collection('orders').doc(order[index].uid).update({status: newStatus })
  }

  return(
    
    <div className="kitchen">
        <div className="header-container">
        <Header />
      </div>
      <div className="page">
      {order && order.map((el, index)=>(
    <div className="card-lista">
      <div className="card-titulo">
      <p>Mesa: {el.table}</p>
        <p>Cliente: {el.clientName}</p>        
        <p>Data: {el.initialTime}</p>
        <p>Status: {el.status}</p>
      </div>
  <div>{el.orders.map((item) => (
      <div className="card-pedido">
        <img src={item.img} alt="img" />
        <p><span>{item.count} x </span> {item.item} </p>     
      </div>      
  ))}</div>
      <div className="bt-container">
        <Button name='Preparar' onClick={() => changeStatus('Preparando', index ) } /> 
         <Button name='Pronto' onClick={() => changeStatus('Pronto', index ) } /> 
               </div>  
    </div>))}
      </div>
        
  
  </div>
  )  
}
export default Kitchen;