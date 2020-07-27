import React, { useState } from 'react'
//import logo from '../../img/logo.svg'
import '../Login/Login.css';
import BtButton from '../../Components/Button.js';
import Input from '../../Components/Input.js';
import LinkRel from '../../Components/Link';
// import Checkbox from '../../Components/Checkbox.js';
// import { FormControl } from '@material-ui/core';

export const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setSenha ] = useState();
  const [salao, setSalao] = useState();
  const [cozinha, setCozinha] = useState();
  
  return (
    <div className ="container">
      <div className= "container-logo">
        {/* <img className="logo" src={logo} alt="Logomarca"></img> */}
      </div>
      <div className="container-form">
        <form noValidate autoComplete="off">
          <Input id="name" name="name" label="Name" type="text" setName={setName}/>
          <Input id="email" name="email" label="E-mail" type="email" setEmail={setEmail}/>
          <Input id="password" name="password" label="Senha" type="password" setSenha={setSenha}/>
          {/* <Checkbox label="Salão" value1="setSalao" handleChange=/>
          <Checkbox label="Cozinha" value="setCozinha"/> */}
          <BtButton name="Cadastrar" />
          <div className="container-inf">
                <LinkRel name="Tem uma conta? Conecte-se!" />
              </div>  
        </form>
      </div>
    </div>
  )

}
export default Register
