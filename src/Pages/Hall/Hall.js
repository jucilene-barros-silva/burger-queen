import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header.js';
import Button from '../../Components/Button.js';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import './Hall.css';
import Input from '../../Components/Input.js';
import SimpleModal from '../../Components/Modal.js';
// import BtHamburger from '../../Components/BtHamburger/BtHamburger.css';


function Hall() {
	const [ menu, setMenu ] = useState([]);
	const [ breakfast, setBreakfast ] = useState(false);
	const [ meal, setMeal ] = useState(false);
	const [ total, setTotal ] = useState(0);
  const [ form, setForm ] = useState({
    clientName:'',
    tableNumber:'',
  });
  const [pedidos, setPedidos] = useState([]);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		firebase.firestore().collection('menu').onSnapshot((itens) => {
			const arrayItens = [];
			itens.forEach((item) => arrayItens.push(item.data()));
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

	function getElement (item){
		setTotal(total + Number(item.value));		
		setPedidos([...pedidos, item])
		if(item.item !== 'Hambúrguer simples' && item.item !== 'Hambúrguer duplo'){
			setPedidos([...pedidos, item])
		} else {
			setOpenModal(true)
		}
	}

  function handleChange({ target }) {
    const { id, value } = target;
    console.log(setForm({ ...form, [id]: value }));
  }
	
	return (
		<div className="hall">
			<div className="header-container">
				<Header />
			</div>		
			<div className='page'>
				<div className="menu-container">
					<div className = "inf-mesa">
						<Input autoFocus="true" id="clientName" label="Nome do cliente " name="clientName" type="text" value={form.clientName} onChange={handleChange} setValue={setForm.clientName}/>
						<Input id="tableNumber" label="Número da mesa" name="tableNumber" type="text"  value={form.tableNumber} onChange={handleChange} setValue={setForm.tableNumber}/>
					</div>
					<div className="button-container">					
            <Button className="button-cafe" name="Café da manhã" onClick={openBreakfast} />        
            <Button name="Refeição" onClick={openMeal} />
						{openModal && <SimpleModal closeModal={handleCloseModal} openModal={handleOpenModal} /> }       
				</div>
        <div className="card-container">
				{breakfast && menu.filter((item) => item.breakfast === true).map((item) => (
					<div className="card" onClick= {() => getElement(item) }>
              <img src={item.img} alt='img' />
							<h5>{item.item}</h5>
							<p>R$ {item.value},00</p>    
						</div>
					))}
				{meal && menu.filter((item) => item.breakfast === false).map((item) => (
					<div className="card" onClick= {() => getElement(item) }>
              <img src={item.img} alt='img' />             
							<h5>{item.item}</h5>
              <p>R$ {item.value},00</p> 
						</div>
					))}
          </div>
				</div>
				<div className="pedido-container">
						<th>Qtd.</th>
						<th>Pedidos</th>
						<th>Valor</th>
				{pedidos && pedidos.map((item)=> (
				<div>
					<table className="table">						
						<tr>
							<td><Button name="-" /> 1 <Button name="+" /></td>
							<td>{item.item}</td>
							<td>R$ {item.value},00</td>
							<td><Button name="X" /></td>
						</tr>
					</table>					
				</div>
			))}
			<h2>Total: R$ {total},00 </h2>
			</div>
			</div>				
			</div>	
		
	)
};
export default Hall;
