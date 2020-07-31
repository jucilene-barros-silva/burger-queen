import React, { useState } from 'react'
import logo from '../../img/logo.svg'
import '../Login/Login.css';
import BtButton from '../../Components/Button.js';
import Input from '../../Components/Input.js';
import LinkRel from '../../Components/Link'
import BtRadio from '../../Components/BtRadio.js';
import firebase from '../../Firebase';
// import { FormControl } from '@material-ui/core';
console.log(firebase);

export const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setSenha ] = useState();
  const [salao, setSalao] = useState();
  const [cozinha, setCozinha] = useState();
  const [occupation, setOccupation] = useState();
  
  
  function registerUser(uid, userName, occupation) {
    const db = firebase.firestore();
    const authUid = firebase.auth().currentUser.uid;
    db.collection('employee').doc(authUid).set({
      userUid: uid,
      nickName: userName,
      occupation: occupation,
    });
  }
  
  function createUser(email, userName, occupation) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => firebase.auth().currentUser.updateProfile({ displayName: `${userName}`, occupation: `${occupation}` }))
      .then(() => { const uid = firebase.auth().currentUser.uid; registerUser(uid, userName, occupation); })
      .catch(error => `Codígo de error: ${error.message}`);

  }
  
  return (
    <div className ="container">
      <div className= "container-logo">
        <img className="logo" src={logo} alt="Logomarca"></img>
      </div>
      <div className="container-form"> 
        <form noValidate autoComplete="off">
          <Input id="name" name="name" label="Name" type="text" onChange={e=> console.log(setName(e.target.value))}/>
          <Input id="email" name="email" label="E-mail" type="email" onChange={e=> console.log(setEmail(e.target.value))} />
          <Input id="password" name="password" label="Senha" type="password" onChange={e=> console.log(setSenha(e.target.value))}/>
          <BtRadio value1="setSalao" value2="setCozinha" label1="Salão" label2="Cozinha" onChange={e=> console.log(setOccupation(e.target.value))}/> 
          <BtButton name="Cadastrar" onClick={e=> console.log(e.target.value)}/>
          <div className="container-inf">
                <LinkRel name="Tem uma conta? Conecte-se!" />
              </div>  
        </form>
      </div>
    </div>
  )

};

export default Register;
