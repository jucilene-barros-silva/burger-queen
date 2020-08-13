import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import '../Hall/Hall.css';
import Button from '../../Components/Button.js';
import Header from '../../Components/Header.js';

const OrderStatus = () => {
  const [order, setOrder] = useState([]);
  const [pendente, setPendente] = useState(false);
  const [preparando, setPreparando] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [entregue, setEntregue] = useState(false);

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

  const openPendente = () => {
    setPendente(true);
    setPreparando(false);
    setPronto(false);
    setEntregue(false);
  };

  const openPreparando = () => {
    setPendente(false);
    setPreparando(true);
    setPronto(false);
    setEntregue(false);
  };

  const openPronto = () => {
    setPendente(false);
    setPreparando(false);
    setPronto(true);
    setEntregue(false);
  };

  const openEntregue = () => {
    setPendente(false);
    setPreparando(false);
    setPronto(true);
    setEntregue(false);
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

  const deleteOrder = (id) => {
    console.log(deleteOrder)
    firebase
      .firestore()
      .collection('orders')
      .doc(id)
      .delete((item, user) => {
        if (item.id === user.uid) {
          return (document.getElementsByName('Deletar').display = false);
        } else {
          document.getElementsByName('Deletar').display = true;
        }
      });
  };

  return (
    <div className="kitchen">
      <div className="header-container">
        <Header />
      </div>
      <div className="page">
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
        <Button className="button-cafe" name="Pronto" onClick={openPronto} />
        <Button
          className="button-cafe"
          name="Entregar"
          onClick={openEntregue}
        />
        {pendente &&
          order
            .filter((item) => item.status === 'Pendente')
            .map((el) => (
              <div className="card-lista">
                <div className="card-titulo">
                  <p>Garçom:{el.WaiterName}</p>
                  <p>Mesa: {el.table}</p>
                  <p>Cliente: {el.name}</p>
                  <p>Data: {el.halltime}</p>
                </div>
                <div>
                  {el.orders
                    .filter((item) => item.status === 'Pendente')
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
                  <Button name="Preparar" onClick={updateStatus} />
                  <Button name="Deletar" onClick={deleteOrder} />
                </div>
              </div>
            ))}
        {preparando &&
          order
            .filter((item) => item.status === 'Preparando')
            .map((el) => (
              <div className="card-lista">
                <div className="card-titulo">
                  <p>Garçom:{el.WaiterName}</p>
                  <p>Cozinheiro:{el.cookName}</p>
                  <p>Mesa: {el.table}</p>
                  <p>Cliente: {el.name}</p>
                  <p>Data: {el.readyTime}</p>
                </div>
                <div>
                  {el.orders
                    .filter((item) => item.status === 'Preparando')
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
                  <Button name="Pronto" onClick={updateStatus} />
                </div>
              </div>
            ))}
        {pronto &&
          order
            .filter((item) => item.status === 'Pronto')
            .map((el) => (
              <div className="card-lista">
                <div className="card-titulo">
                  <p>Garçom:{el.WaiterName}</p>
                  <p>Cozinheiro:{el.cookName}</p>
                  <p>Mesa: {el.table}</p>
                  <p>Cliente: {el.name}</p>
                  <p>Data: {el.finalTime}</p>
                </div>
                <div>
                  {el.orders
                    .filter((item) => item.status === 'Pronto')
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
        {entregue &&
          order
            .filter((item) => item.status === 'Entregue')
            .map((el) => (
              <div className="card-lista">
                <div className="card-titulo">
                  <p>Garçom:{el.WaiterName}</p>
                  <p>Cozinheiro:{el.cookName}</p>
                  <p>Mesa: {el.table}</p>
                  <p>Cliente: {el.name}</p>
                  <p>Data: {el.finalTime}</p>
                </div>
                <div>
                  {el.orders
                    .filter((item) => item.status === 'Pronto')
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
                  <Button name="Deletar" onClick={deleteOrder} />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
export default OrderStatus;
