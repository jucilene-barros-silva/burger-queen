import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header.js';
import Button from '../../Components/Button.js';
import 'firebase/firestore';
import firebase from '../../Firebase.js';
import './Hall.css';

function Hall() {

	const [ menu, setMenu ] = useState([]);
	const [ breakfast, setBreakfast ] = useState(false);
	const [ meal, setMeal ] = useState(false);

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
	return (
		<div className="hall">
			<div className="header-container">
				<Header />
			</div>			
			<div className="menu">
			<div className="button-container">
					<div>
						<Button className="button-cafe" name="Café da manhã" onClick={openBreakfast} />
					</div>
					<div>
						<Button name="Refeição" onClick={openMeal} />
					</div>
			</div>
			<div className="card-container">
			{breakfast && menu.filter((item) => item.breakfast === true).map((item) => (
					<div className="card">
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
		</div>
	
	);
	
}

export default Hall;
