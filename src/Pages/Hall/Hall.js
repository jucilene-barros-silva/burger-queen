import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header.js';
import Button from '../../Components/Button.js';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import './Hall.css';
import Input from '../../Components/Input.js';

function Hall() {

	const [ menu, setMenu ] = useState([]);
	const [ breakfast, setBreakfast ] = useState(false);
  const [ meal, setMeal ] = useState(false);
  const [ form, setForm ] = useState({
    clientName:'',
    tableNumber:'',
  });
  const [pedidos, setPedidos] = useState([]);
  // const [ , setTableNumber] = useState('');

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
  
	function getElement (item){
		setPedidos([...pedidos, item])
	}
  function handleChange({ target }) {
    const { id, value } = target;
    console.log(setForm({ ...form, [id]: value }));
  }

	return (
		<div className="hall">
			<Header />
				<div className="menu">
				<div className="button-container">
          <div>
            <Input autoFocus="true" id="clientName" label="Nome do cliente " name="clientName" type="text" value={form.clientName} onChange={handleChange} setValue={setForm.clientName}/>

            <Input id="tableNumber" label="Número da mesa" name="tableNumber" type="text"  value={form.tableNumber} onChange={handleChange} setValue={setForm.tableNumber}/>
          </div>

          <div>
            <Button className="button-cafe" name="Café da manhã" onClick={openBreakfast} />
          </div>
          <div>
            <Button name="Refeição" onClick={openMeal} />
          </div>
				</div>
        <div className="card-container">
				{breakfast && menu.filter((item) => item.breakfast === true).map((item) => (
						<div className="card" onClick= {() => getElement(item)}>
              <img src={item.img} alt='img' />
							<h5>{item.item}</h5>
							<p>{item.value}</p>    
						</div>
					))}
				{meal && menu.filter((item) => item.breakfast === false).map((item) => (
						<div className="card">
              <img src={item.img} alt='img' />             
							<h5>{item.item}</h5>
              <p>{item.value}</p> 
						</div>
					))}
          </div>
			</div>
			<div>
			{pedidos && pedidos.map((item)=> (
			<div>
				<li>{item.item}</li>
				<li>{item.value}</li>
			</div>
			))};
			</div>
			

		</div>

	);

}

export default Hall;
