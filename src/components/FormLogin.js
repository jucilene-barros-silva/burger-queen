import React, { useState } from 'react';
import BtButton from '../../src/Components/Button.js';
import Input from '../../src/Components/Input.js';
import { Link } from 'react-router-dom';
import firebase from '../Firebase.js';

const FormLogin = () => {
    const [form, setform] = useState({
			email: '',
			password: ''
		});	

		function handleChange({ target }){
			const {id, value} = target;
			console.log(setform({ ...form, [id]: value }))
		}
		
		async function handleSubmit(e) {
			e.preventDefault();
			const email = form.email;
			const password = form.password;			
			
			await firebase.auth().signInWithEmailAndPassword(email, password)
			.then((res) => alert("Logado!!!"))
			.catch((e) => alert("Erro"))
		}

		return (
		
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>

				<Input id="email" name="email" label="E-mail" type="email" value={form.email} onChange={handleChange} setValue={setform.email} /> 
				

				<Input id="password" name="password" label="password" type="password" value={form.password} onChange={handleChange} setValue={setform.password}  />
			
				<BtButton name="Acessar" />

				<div className="container-inf">
				<p>Esqueceu a senha?</p> <p>Não tem uma conta? <Link to="register"> Cadastre-se!</Link></p>
				</div>
			</form>
		
	);
};
export default FormLogin;