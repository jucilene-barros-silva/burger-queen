import React, {useState, useEffect} from 'react';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import '../Hall/Hall.css';

const Kitchen = () => {
  const [ order, setOrder ] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .onSnapshot((itens) => {
        const arrayItens = [];
        itens.forEach((item) => arrayItens.push(item.data()));
        setOrder(arrayItens);
        console.log(arrayItens)
        
      });
  }, []);

  return(
    <>
   {order && order.map((el)=>(
    <div className="card-container">
       <div className="card-titulo">
        <p>Cliente: {el.name}</p>
        <p>Mesa: {el.table}</p>
        <p>Data: {el.time}</p>
      </div>
   <h4>{el.orders.map((item) => (
      <div className="card-pedido">
        <img src={item.img} alt="img" />
        <p><span>{item.count} x </span> {item.item} </p>
      </div>
   ))}</h4>
    </div>))}
  
   </>
  )
}
export default Kitchen;



