import React, { useState, useEffect } from 'react';
import firebase from '../../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import  Button  from '../../Components/Button.js'

export default function DeliveredOrders() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .onSnapshot((itens) => {
        const arrayItens = [];
        itens.forEach((item) => arrayItens.push(item.data()));
        console.log(arrayItens)
        setPedidos(arrayItens);
        
      });
  }, []);

  const updateStatus = item => {
    firebase
      .firestore()
      .collection('orders')
      .doc(item.id)
      .update({
        status: "Pronto",
        ReadyTime: new Date().toLocaleString('pt-BR'),
    });
  }

  return (
    <div className="pedido-container">
    <th>Qtd.</th>
    <th>Pedidos</th>
    <th>Valor</th>
    {pedidos &&
      pedidos
      .filter((item) => item.status === 'Preparando').map((item) => (
        <div>
          <table className="table">
            <tr>
              <td>{item.item}</td>
              <td>R$ {item.value},00</td>
            </tr>
            <tr>
              <td>{item.item}</td>
              <td>R$ {item.value},00</td>
            </tr>
          </table>
          <h2>Total: R$ {item.total},00 </h2>
        </div>
      ))}
    <Button onClick={updateStatus} name="Deletar"/>
    
  </div>) 
    
}