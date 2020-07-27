import React, { useState } from 'react'
import logo from '../../img/logo.svg'
import './Login.css';
import { TextField, Link } from '@material-ui/core';
// import Firebase from 'Firebase';
import BtButton from '../../Components/Button.js';
import Input from '../../Components/Input.js';
import Checkbox from '../../Components/Checkbox.js';

export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setSenha] = useState();

    // loginEmailAndPass(email, password) {
    //     firebase
    //       .auth()
    //       .signInWithEmailAndPassword(email, password)
    //       .then(() => {
    //         window.location.href = '#feed';
    //       })
    //       .catch((error) => {
    //         if (error.code === 'auth/wrong-password') {
    //           return 'Senha incorreta!';
    //         }
    //         if (error.code === 'auth/user-not-found') {
    //           return 'E-mail não localizado!';
    //         }
    //         if (error.code === 'auth/invalid-email') {
    //           return 'E-mail invalido!';
    //         }
    //         return `Codigo de error: ${error.code}`;
    //       });
    //   };      

   return (
    <div className="container">
      <div className="container-logo">
          <img className="logo" src={logo} alt="Logomarca"></img>
    </div>
      <div className="container-form">
      <form noValidate autoComplete="off"> 
            <Input id="email" name="email" label="E-mail" type="email" setEmail={setEmail}/>
            <Input id="password" name="password" label="Senha" type="password" setEmail={setSenha}/>
            <BtButton name="Logar" />
            <div className="container-inf">
            <Checkbox name="Esqueceu a senha?"/>
            <Checkbox name="Não tem uma conta? Cadastre-se!" />
        </div>                     
      </form>
      </div>
    </div>
  );
}
export default Login;