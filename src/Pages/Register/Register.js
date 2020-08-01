import React from 'react';
import '../Login/Login.css';
import FormRegister from '../../Components/FormRegister.js';
import Icone from '../../Components/Icone.js';

export const Register = () => {	
	return (
		<div className="container">
			<div className="container-logo"></div>
			<div className="container-form">
				<Icone />
				<h2>CADASTRO</h2>
				{ <FormRegister /> }
			</div>
		</div>
	)
};
export default Register;
