import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import '../Hall/Hall.css';
import Button from '../../Components/Button.js';
import HeaderKitchen from '../../Components/HeaderKitchen.js';

const Kitchen = () => {
  const [order, setOrder] = useState([]);
  const [pending, setPending] = useState(true);
  const [preparing, setPreparing] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .onSnapshot((itens) => {
        const arrayItens = [];
        itens.forEach((item) => {
          const dataItem = item.data();
          dataItem.uid = item.id;
          arrayItens.push(dataItem);
        });
        setOrder(arrayItens);
      });
  }, []);

  const openPending = () => {
    setPending(true);
    setPreparing(false);
  }

  const openPreparing = () => {
    setPending(false);
    setPreparing(true);
  }

  const changePreparingStatus = (newStatus, index) => {
    firebase
      .firestore()
      .collection("orders")
      .doc(order[index].uid)
      .update({
        status: newStatus,
        preparingTime: new Date().toLocaleString('pt-BR'),
        cookId: firebase.auth().currentUser.uid,
        cookName: firebase.auth().currentUser.displayName,
      });
  };

  const changeReadyStatus = (newStatus, index) => {
    firebase
      .firestore()
      .collection('orders')
      .doc(order[index].uid)
      .update({
        status: 'Pronto',
        readyTime: new Date().toLocaleString('pt-BR'),
      })
      .then(() => {});
  };

  return (
    <div className="kitchen">
      <div className="header-container">
        <HeaderKitchen />
      </div>
      <div className="page-order">
        <div className="pendente">
        <div className="button-container page-order conj-btn">
        <Button
            className="button-cafe"
            color="primary"
            name="Pendente"
          />
          </div>


        </div>
        <div className="preparando">
        <div className="button-container page-order conj-btn">
        <Button
            className="button-cafe"
            color="primary"
            name="Preparando"
            onClick={openPreparing}
          />
          </div>

        </div>



        <div className="button-container page-order conj-btn">


        </div>
        {pending &&
          order
          .filter((item) => item.status === 'Pendente')
          .map((item,index) => (
            <div className="card-lista">
              <div className="card-titulo">
                <p>Atendente:{item.waiterName}</p>
                <p>Mesa: {item.table}</p>
                <p>Cliente: {item.clientName}</p>
                <p>Atendimento: {item.initialTime}</p>
                <p>Status: {item.status}</p>
              </div>
              <div>
                {item.orders.map((product) => (
                  <div className="card-pedido">
                    <img src={product.img} alt="img" />
                    <p>
                      <span>{product.count} x </span> <span>{product.item}</span>
                    </p>
                    <p>Total: R$ {product.value},00</p>
                  </div>
                ))}
              </div>
              <div className="bt-container">
                <Button
                color="primary"
                  name="Preparar"
                  onClick={() => changePreparingStatus('Preparando', index)}
                />
              </div>
            </div>
          ))}
          {preparing &&
          order
          .filter((item) => item.status === 'Preparando')
          .map((item, index) => (
            <div className="card-lista">
              <div className="card-titulo">
                <p>Atendente:{item.waiterName}</p>
                <p>Mesa: {item.table}</p>
                <p>Cliente: {item.clientName}</p>
                <p>Cozinheiro:{item.cookName}</p>
                <p>Atendimento: {item.initialTime}</p>
                <p>Início Preparo: {item.preparingTime}</p>
                <p>Status: {item.status}</p>
              </div>
              <div>
                {item.orders.map((product) => (
                  <div className="card-pedido">
                    <img src={product.img} alt="img" />
                    <p>
                      <span>{product.count} x </span> {product.item}
                    </p>
                    <p>R$ {product.value},00</p>
                  </div>
                ))}
              </div>
              <div className="bt-container">
                  <Button
                  color="primary"
                  name="Pronto"
                  onClick={() => changeReadyStatus('Pronto', index)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Kitchen;
