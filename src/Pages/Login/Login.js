import React from 'react';
import './Login.css';
import FormLogin from '../../Components/FormLogin.js';
import Icone from '../../Components/Icone.js';


const Login = () => {
	
	return (
		
		<div className="container">			
			<div className="container-logo"></div>
			<div className="container-form">
				<Icone />	
				<h2>LOGIN</h2>
				<FormLogin />
			</div>
		</div>
	);
};
export default Login;
