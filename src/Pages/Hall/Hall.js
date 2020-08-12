import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header.js';
import Button from '../../Components/Button.js';
import firebase from '../../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import './Hall.css';
import Input from '../../Components/Input.js';
import SimpleModal from '../../Components/Modal.js';
import SimpleAlerts from '../../Components/Alert.js'
import Diminuir from '../../img/menos.svg';
import Aumentar from '../../img/mais.svg';
import Excluir from '../../img/lixo.svg';


function Hall() {
  const [menu, setMenu] = useState([]);
  const [breakfast, setBreakfast] = useState(false);
  const [meal, setMeal] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    clientName: '',
    tableNumber: '',
  });
  const [pedidos, setPedidos] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	

  useEffect(() => {
    firebase
      .firestore()
      .collection('menu')
      .onSnapshot((itens) => {
        const arrayItens = [];
        itens.docs.forEach((item) => arrayItens.push(item.data()));
        setMenu(arrayItens);
      });
  }, []);

  function openBreakfast() {
    setBreakfast(true);
    setMeal(false);
  }

  function openMeal() {
    setBreakfast(false);
    setMeal(true);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // function getElement(item) {
  //   setTotal(total + Number(item.value));
  //   setPedidos([...pedidos, item]);
  //   if (
  //     item.item !== 'Hambúrguer simples' &&
  //     item.item !== 'Hambúrguer duplo'
  //   ) {
  //     setPedidos([...pedidos, item]);
  //   } else {
  //     setOpenModal(true);
  //   }
  // }

	
  function handleChange({ target }) {
    const { id, value } = target;
    console.log(setForm({ ...form, [id]: value }));
  }
//Função do Gabriel, quantidade está ficando negativa quando clica na foto

  // function newRequest(item, operacao) {
	// 	const indexOrder = pedidos.findIndex((order) => order.item === item.item);
	// 	if (
  //     item.item === 'Hambúrguer simples' ||
  //     item.item === 'Hambúrguer duplo'){
	// 		setOpenModal(true);
	// 	}
  //   if (indexOrder === -1) {
  //     setPedidos([...pedidos, { ...item, count: 1 }]);
	// 	}
	// 	else {
	// 		let quant = pedidos[indexOrder].count;
	// 		quant = operacao === 1? quant+1 : quant-1;
	// 		pedidos[indexOrder].count = quant;
  //     setPedidos([...pedidos]);
	// 	}
	// }
	
	function newRequest(item) {
		const indexOrder = pedidos.findIndex((order) => order.item === item.item);
		if (
      item.item === 'Hambúrguer simples' ||
      item.item === 'Hambúrguer duplo'){
			setOpenModal(true);
		}
    if (indexOrder === -1) {
      setPedidos([...pedidos, { ...item, count: 1 }]);
		}
		
		else {
			pedidos[indexOrder].count++;
      setPedidos([...pedidos]);
			console.log(indexOrder);
			console.log(pedidos);
		}
	}

	const [subtracao, setSubtracao] = useState()
	const subItem = (item) =>{
		const indexOrder = pedidos.findIndex((order) => order.item === item.item);
		if (item.count===1){
			setSubtracao(null);
		}else{
			setSubtracao(pedidos[indexOrder].count--);
		}
  }
  
  const deleteItem = (product) => {
    const remove = pedidos.filter((el) => el.item !== product.item);
    setPedidos(remove);
    console.log(pedidos);
  };

  const sendOrder = (e) => {
    e.preventDefault();
    if (pedidos.length && form.clientName && form.tableNumber) {
      firebase
        .firestore()
        .collection('orders')
        .doc()
        .set({
					id:firebase.auth().currentUser.uid,
					waiterName:firebase.auth().currentUser.displayName,
					clientName:form.clientName,
          table: parseInt(form.tableNumber),
          orders: pedidos,
          total: total,
          status: "Pendente",
					hallTime: new Date().toLocaleString('pt-BR')
        })
        .then(() => {
          setPedidos([]);
          setForm({
						clientName: '',
						tableNumber: '',
					});

          setError('Pedido enviado com sucesso');
        });
    } else if (!pedidos.length) {
      setError('Um item deve ser selecionado');
    } else if (!form.tableNumber) {
      setError('Digite o número da mesa');
    } else if (!form.clientName) {
      setError('Digite o nome do cliente');
    }
  };

	const total = pedidos.reduce((acumulador, itemAtual)=>{
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
              name="Café da manhã"
              onClick={openBreakfast}
            />
            <Button name="Refeição" onClick={openMeal} />
            {openModal && (
              <SimpleModal
                closeModal={handleCloseModal}
                openModal={handleOpenModal}
              />
            )}
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
          {pedidos && pedidos.map((item) => (              
            <div className="pedido-itens">
              <div>
              <img src={Diminuir} alt="Botão Diminuir" onClick={() => subItem(item)} />
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
            <h2>Total: R$ {total},00 </h2>
            
          <Button onClick={sendOrder} name="Enviar Pedido"/>
					{error && <SimpleAlerts severity="error">{error}</SimpleAlerts>}
          </div>
          <div className='bt-pedidos'>
          </div>         					
        </div>
      </div>
    </div>
  );
}
export default Hall;
