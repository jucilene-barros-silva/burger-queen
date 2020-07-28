import React, { useState } from 'react';
import BtButton from '../../src/Components/Button.js';
import Input from '../../src/Components/Input.js';
import Checkbox from '../../src/Components/Checkbox.js';


const FormLogin = () => {
    const [email, setEmail] = useState();
		const [password, setSenha] = useState();
		
		return (
		<div>
			<form noValidate autoComplete="off">
				<Input id="email" name="email" label="E-mail" type="email" setEmail={setEmail}  />
				<Input id="password" name="password" label="Senha" type="password" setEmail={setSenha} />
				<BtButton name="Acessar" />
				<div className="container-inf">
					<Checkbox name="Esqueceu a senha?" />
					<Checkbox name="Não tem uma conta? Cadastre-se!" />
				</div>
			</form>
		</div>
	);
};

export default FormLogin;
