import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header.js';
import Button from '../../Components/Button.js';
import firebase from '../../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import '../Hall/Hall.css'
import Input from '../../Components/Input.js';
import SimpleAlerts from '../../Components/Alert.js'
import Diminuir from '../../img/menos.svg';
import Aumentar from '../../img/mais.svg';
import Excluir from '../../img/lixo.svg';

const Hall = () => {
  const [menu, setMenu] = useState([]);
  const [breakfast, setBreakfast] = useState(false);
  const [meal, setMeal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    clientName: '',
    tableNumber: '',
  });

  const [orders, setOrders] = useState([]);
  const [calcSub, setCalcSub] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection("menu")
      .onSnapshot((itens) => {
        const arrayItens = [];
        itens.docs.forEach((item) => arrayItens.push(item.data()));
        setMenu(arrayItens);
      });
  }, []);

  const openBreakfast= () => {
    setBreakfast(true);
    setMeal(false);
  }

  const openMeal = () => {
    setBreakfast(false);
    setMeal(true);
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  }

	function newRequest(item) {
		const indexOrder = orders.findIndex((order) => order.item === item.item);
    if (indexOrder === -1) {
      setOrders([...orders, { ...item, count: 1 }]);
		}else {
      orders[indexOrder].count++;
      setOrders([...orders]);      
    }  
	}

	
	const subItem = (item) =>{
		const indexOrder = orders.findIndex((order) => order.item === item.item);
		if (item.count===1){  
      return document.getElementsByName('-').disabled = true;
		}else{
			setCalcSub(orders[indexOrder].count--);
		}
  }
  
  const deleteItem = (product) => {
    const remove = orders.filter((el) => el.item !== product.item);
    setOrders(remove);
  };

  const sendOrder = (e) => {
    e.preventDefault();
    if (orders.length && form.clientName && form.tableNumber) {
      firebase
        .firestore()
        .collection('orders')
        .doc()
        .set({
					waiterId:firebase.auth().currentUser.uid,
					waiterName:firebase.auth().currentUser.displayName,
					clientName:form.clientName,
          table: parseInt(form.tableNumber),
          orders: orders,
          total: total,
          status: "Pendente",
          initialTime: new Date().toLocaleString('pt-BR'),
          preparingTime: null,
          cookId: null,
          cookName: null,
          readyTime: null,
          finalTime: null
        })
        .then(() => {
          setOrders([]);
          setForm({
						clientName: '',
						tableNumber: '',
					});
          setSuccess('Pedido enviado com sucesso');
        });

    } else if (!orders.length) {
      setError('Um item deve ser selecionado');
    } else if (!form.tableNumber) {
      setError('Digite o número da mesa');
    } else if (!form.clientName) {
      setError('Digite o nome do cliente');
    }
  };

	const total = orders.reduce((acumulador, itemAtual)=>{
		return acumulador + (Number(itemAtual.value) * itemAtual.count)
  },0)

  return (
    <div className="hall">
      <div className="header-container">
        <Header />
      </div>
      <div className="page">
        <div className="menu-container">
          <div className="inf-mesa">
            <div>
              <span>Nome Cliente: </span>
            <Input
              autoFocus="true"
              id="clientName"
              label="Nome do cliente "
              name="clientName"
              type="text"
              value={form.clientName}
              onChange={handleChange}
              setValue={setForm.clientName}
            />
            </div>
          <div>
            <span>Mesa: </span>
          <Input
              id="tableNumber"
              label="Número da mesa"
              name="tableNumber"
              type="text"
              value={form.tableNumber}
              onChange={handleChange}
              setValue={setForm.tableNumber}
            />
          </div>
          </div>
          <div className="button-container">
            <Button
              className="button-cafe"
              color="primary"
              name="Café da manhã"
              onClick={openBreakfast}
            />
            <Button color="primary" name="Refeição" onClick={openMeal} />
          </div>
          <div className="card-container">
            {breakfast &&
              menu
                .filter((item) => item.breakfast === true)
                .map((item) => (
                  <div className="card" onClick={() => newRequest(item)}>
                    <img src={item.img} alt="img" />
                    <h5>{item.item}</h5>
                    <p>R$ {item.value},00</p>
                  </div>
                ))}
            {meal &&
              menu
                .filter((item) => item.breakfast === false)
                .map((item) => (
                  <div className="card" onClick={() => newRequest(item)}>
                    <img src={item.img} alt="img" />
                    <h5>{item.item}</h5>
                    <p>R$ {item.value},00</p>
                  </div>
                ))}
          </div>
        </div>
        <div className="pedido-container">
          <div className="pedido-titulo">
            <div>Qtd.</div>
            <div>Pedidos</div>
            <div>Valor</div>
            <div>Excluir</div>              
          </div>     
          {orders && orders.map((item) => (              
            <div className="pedido-itens">
              <div>
              {calcSub && <img src={Diminuir} alt="Botão Diminuir" name="-" onClick={() => subItem(item)} />}
              <span>{item.count}</span>
              <img src={Aumentar} alt="Botão Aumentar" onClick={() => newRequest(item)} />
              </div>
              <div>
                <span>{item.item}</span>  
              </div>
              <div>
              <span>R$ {item.value},00</span>
              </div>
              <div>
              <img src={Excluir} alt="Botão Excluir" onClick={() => deleteItem(item)} />  
              </div>
            </div>            
            ))}
          <div className='total-pedidos'>
            <div>
            <p>Total: </p>
            <h2>R$ {total},00 </h2>
            </div> 
          <Button onClick={sendOrder} color="primary" name="Enviar Pedido"/>
          </div>
            <div>
          {error && <SimpleAlerts severity="error">{error}</SimpleAlerts>}
          {success && <SimpleAlerts severity="success">{success}</SimpleAlerts>}
            </div>
        </div>
      </div>
    </div>
  );
}
export default Hall;
