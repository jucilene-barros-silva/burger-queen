import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import '../Hall/Hall.css';
import Button from '../../Components/Button.js';
import HeaderKitchen from '../../Components/HeaderKitchen.js';

const Kitchen = () => {
  const [order, setOrder] = useState();
  const [pending, setPending] = useState(true);
  const [preparing, setPreparing] = useState(false);
  // const [ready, setReady] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .onSnapshot((itens) => {
        const arrayItens = [];
        itens.forEach((item) => {
          const dataItem = item.data();
          dataItem.uid = item.id;
          console.log(dataItem.uid)
          console.log(item.data())
          if (
            dataItem.status === 'Pendente' ||
            dataItem.status === 'Preparando'
          ) {
            arrayItens.push(dataItem);
          }
        });
        console.log(arrayItens)
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

  const changeRadyStatus = (newStatus, index) => {
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
      <div className="page">
        <div className="conj-btn">
          <Button
            className="button-cafe"
            color="primary"
            name="Pendente"
            onClick={openPending}
          />
          <Button
            className="button-cafe"
            color="primary"
            name="Preparando"
            onClick={openPreparing}
          />
        </div>
        {order &&
          order.filter((item) => item.status === 'Pendente')
          .map((el, index) => (
            <div className="card-lista">
              <div className="card-titulo">
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
                    <p>R$ {item.value},00</p>
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
          {order &&
          order
          .filter((item) => item.status === 'Preparando')
          .map((el, index) => (
            <div className="card-lista">
              <div className="card-titulo">
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
                      <span>{item.count} x </span> {item.item}
                    </p>
                    <p>R$ {item.value},00</p>
                  </div>
                ))}
              </div>
              <div className="bt-container">
                  <Button
                  color="primary"
                  name="Pronto"
                  onClick={() => changeRadyStatus('Pronto', index)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Kitchen;
