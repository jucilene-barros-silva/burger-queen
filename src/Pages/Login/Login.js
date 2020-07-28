import React from 'react';
import './Login.css';
import FormLogin from '../../Components/FormLogin.js';
import Logo from '../../Components/Logo.js';


export const Login = () => {

	return (
		<div className="container">
			<div className="container-logo">
				<Logo />
			</div>
			<div className="container-form">
				<FormLogin />
			</div>
		</div>
	);
};


export default Login;
