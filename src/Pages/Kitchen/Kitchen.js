import React, {useState, useEffect} from 'react';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import '../Hall/Hall.css';
import Button from '../../Components/Button.js';

const Kitchen = () => {
  const [ order, setOrder ] = useState();
  const [pendente, setPendente ] = useState([]);
  const [pronto, setPronto] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .onSnapshot((itens) => {
        const arrayItens = [];
        itens.forEach((item) => arrayItens.push(item.data()));
        setOrder(arrayItens);
        console.log(arrayItens)
        setPendente(arrayItens.filter(doc => doc.status === 'Pendente'));
        setPronto(arrayItens.filter(doc=> doc.status === 'Pronto'));
      });
  }, []);

  return(
    <div className="page">
   {order && order.map((el)=>(
    <div className="card-lista">
       <div className="card-titulo">
       <p>Mesa: {el.table}</p>
        <p>Cliente: {el.name}</p>        
        <p>Data: {el.time}</p>
      </div>
   <div>{el.orders.map((item) => (
      <div className="card-pedido">
        <img src={item.img} alt="img" />
        <p><span>{item.count} x </span> {item.item} </p>
     
      </div>      
   ))}</div>
      <div className="bt-container">
          <Button name='Preparar' />
      </div>  
    </div>))}
  
   </div>
  )

  
}
export default Kitchen;