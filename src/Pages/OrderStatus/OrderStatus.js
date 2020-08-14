import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import '../Hall/Hall.css';
import Button from '../../Components/Button.js';
import Header from '../../Components/Header.js';
import './OrderStatus.css';

const OrderStatus = () => {
  const [order, setOrder] = useState([]);
  const [pendente, setPendente] = useState(false);
  const [preparando, setPreparando] = useState(false);
  const [pronto, setPronto] = useState(false);


  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .onSnapshot((itens) => {
        const arrayItens = [];
        itens.forEach((item) => arrayItens.push(item.data()));
        setOrder(arrayItens);
        console.log(arrayItens);
      });
  }, []);

  // Tentando ajustar a Lógica
  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection('orders')
  //     .onSnapshot((itens) => {
  //       const arrayItens = [];
  //       itens.forEach((item) => {

  //       const dataItem = item.data();
  //       dataItem.uid = item.id
  //       if (dataItem.status === 'Pendente' || dataItem.status === 'Preparando'|| dataItem.status === 'Pronto'){
  //       arrayItens.push(dataItem)
  //       }if (dataItem.status === 'Preparando'){
  //       }
  //       });
  //       setOrder(arrayItens);
  //       console.log(arrayItens)
  //     });
  // }, []);

  const openPendente = () => {
    setPendente(true);
    setPreparando(false);
    setPronto(false);

  };

  const openPreparando = () => {
    setPendente(false);
    setPreparando(true);
    setPronto(false);

  };

  const openPronto = () => {
    setPendente(false);
    setPreparando(false);
    setPronto(true);

  };


  const updateStatus = (item) => {
    firebase
      .firestore()
      .collection('orders')
      .doc(item.id)
      .update((item, user) => {
        if (item.status === 'Pendente' && item.id !== user.uid) {
          return {
            status: 'Preparando',
            preparingTime: new Date().toLocaleString('pt-BR'),
            id: firebase.auth().currentUser.uid,
            cookName: firebase.auth().currentUser.displayName,
          };
        }
        if (item.status === 'Preparando' && item.id !== user.uid) {
          return {
            status: 'Pronto',
            readyTime: new Date().toLocaleString('pt-BR'),
          };
        }
        if (item.status === 'Pronto' && item.id === user.uid) {
          return {
            status: 'Entregue',
            finalTime: new Date().toLocaleString('pt-BR'),
          };
        }
      });
  };

  // const updateStatus = (item) => {
  //   firebase
  //     .firestore()
  //     .collection('orders')
  //     .doc(item.id)
  //     .update((item, user) => {
  //       console.log(item);
  //       if (item.status === 'Pendente') {
  //         return {
  //           status: 'Cancelado',
  //           preparingTime: new Date().toLocaleString('pt-BR'),            
  //         };
  //       }
  //       if (item.status === 'Pronto') {
  //         return {
  //           status: 'Entregue',
  //           finalTime: new Date().toLocaleString('pt-BR'),
  //           preparationTime: "Colocar o valor do Cálculo aqui"
  //         };
  //       }
  //     });
  // };

  const deleteOrder = (id) => {
    console.log(deleteOrder)
    firebase
      .firestore()
      .collection('orders')
      .doc(id)
      .delete()
  };

  return (
    <div className="kitchen">
      <div className="header-container">
        <Header />
      </div>
      <div className="page-order">
        <div className='conj-btn'>
        <Button
          className="button-cafe"
          name="Pendente"
          onClick={openPendente}
        />
        <Button
          className="button-cafe"
          name="Preparando"
          onClick={openPreparando}
        />
        <Button 
        className="button-cafe" 
        name="Pronto" 
        onClick={openPronto} 
        />
      
        </div>
        {pendente &&
          order
            .filter((item) => item.status === 'Pendente')
            .map((el) => (
              <div className="card-lista">
                <div className="card-titulo">
                  <p>Garçom:{el.waiterName}</p>
                  <p>Mesa: {el.table}</p>
                  <p>Cliente: {el.clientName}</p>
                  <p>Data: {el.initialTime}</p>
                  <p>Status: {el.status}</p>
                </div>
                <div>
                  {el.orders.map((item) => (
                      <div className="card-pedido">
                        <img src={item.img} alt="img" />
                        <p>
                          <span>{item.count} x </span> {item.item}{' '}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="bt-container">
                  {/* <Button name="Preparar" onClick={updateStatus} /> */}
                  <Button name="Cancelar Pedido" onClick={deleteOrder} />
                </div>
              </div>
            ))}
        {preparando &&
          order.filter((item) => item.status === 'Preparando').map((el) => (
              <div className="card-lista">
                <div className="card-titulo">
                  <p>Garçom:{el.waiterName}</p>
                  <p>Cozinheiro:{el.cookName}</p>
                  <p>Mesa: {el.table}</p>
                  <p>Cliente: {el.clientName}</p>
                  <p>Data: {el.initialTime}</p>
                  <p>Status: {el.status}</p>
                </div>
                <div>
                  {el.orders
                    .map((item) => (
                      <div className="card-pedido">
                        <img src={item.img} alt="img" />
                        <p>
                          <span>{item.count} x </span> {item.item}
                        </p>
                      </div>
                    ))}
                </div>
                
              </div>
            ))}
        {pronto &&
          order
            .filter((item) => item.status === 'Pronto')
            .map((el) => (
              <div className="card-lista">
                <div className="card-titulo">
                  <p>Garçom:{el.waiterName}</p>
                  <p>Cozinheiro:{el.cookName}</p>
                  <p>Mesa: {el.table}</p>
                  <p>Cliente: {el.clientName}</p>
                  <p>Data: {el.finalTime}</p>
                  <p>Status: {el.status}</p>
                  <p>Tempo de Preparo: {el.status}</p>
                </div>
                <div>
                  {el.orders
                    .map((item) => (
                      <div className="card-pedido">
                        <img src={item.img} alt="img" />
                        <p>
                          <span>{item.count} x </span> {item.item}{' '}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="bt-container">
                  <Button name="Entregar" onClick={updateStatus} />
                </div>
              </div>
            ))}
        </div>
    </div>
  );
};
export default OrderStatus;
