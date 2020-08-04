import React, { useState, useEffect } from 'react';
import BtButton from '../Components/Button.js';
import Input from '../Components/Input.js';
import BtRadio from '../Components/BtRadio.js';
import { Link } from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SimpleAlerts from './Alert.js'

const FormRegister = () => {
  const [ form, setForm ] = useState({
		name: '',
		email: '',
    password: '',			
  })
  const [ occupation, setOccupation ] = useState('')
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorOccupation, setErrorOccupation] = useState(false);
  const navigate = useNavigate();

  function validation() {
    setErrorName(false);
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorOccupation(false);

    let isRight = true;
    if (!form.name) {
      setErrorName(true);
      isRight = false;
    }
    if  
      (!(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(form.email))){
      setErrorEmail('Formato de e-mail inválido');
    }
    if (!form.email) {
      setErrorEmail('Email obrigatório');
      isRight = false;
    }
    if (!("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$".test(form.password))){
      setErrorPassword('Mínimo 4 caracteres, pelo menos 1 letra e 1 número');
    }
    if (!form.password) {
      setErrorPassword(true);
      isRight = false;
    }
    if (!occupation) {
      setErrorOccupation('Escolha uma das opções');
      isRight = false;
    }
  
    return isRight;
  }

  useEffect( () => {
    
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged( (user) => {
      if(user){
        db.collection('employees')
        .doc(user.uid)
        .get()
        .then( user => {
          if(user.data().occupation === 'hall'){
              navigate('/hall')
          } else {
            navigate('/kitchen')
          }
        });
      } else {
        navigate('/')
      };

    });
  }, [navigate])

  function handleChange({ target }) {
    const {id, value} = target;
    console.log(setForm({ ...form, [id]: value}))
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = form.name;
    const email = form.email;
    const password = form.password;
    // const radio = occupation;
    
    const isRight = validation();

    if(isRight){
      firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => { 
      alert("Usuário Cadastrado")
    })
    .then((res) => {
      const db = firebase.firestore();
      const authUid = firebase.auth().currentUser.uid;
      db.collection('employees').doc(authUid).set({
        userUid: authUid,
        name,
        email,
        occupation,
      }).then(
        firebase.auth().currentUser.updateProfile({
          displayName: name,
        })
      )
    .catch((e) => alert("Erro no cadastro"))
    })
    };
    
  };    

  return (

    <form noValidate autoComplete="off"  onSubmit={handleSubmit} >

      <Input id="name" name="name" label="Name" type="text" value={form.name} onChange={handleChange} setValue={setForm.name} />
      
      {errorName && (<SimpleAlerts severity="error">Por favor, preencha seu nome</SimpleAlerts>)}
      
      <Input id="email" name="email" label="E-mail" type="email" value={form.email} onChange={handleChange} setValue={setForm.email}  />
      
      {errorEmail && (<SimpleAlerts severity="error">{errorEmail}</SimpleAlerts>)}
      
      <Input id="password" name="password" label="Senha" type="password" value={form.password} onChange={handleChange}  setValue={setForm.password} />
      
      {errorPassword && (<SimpleAlerts severity="error">Sua senha deve ter no mínimo 4 caracteres, pelo menos 1 letra e 1 número</SimpleAlerts>)}
      
      <BtRadio id="hall" type="radio"  value="hall" name="occupation" text="Salão" htmlFor="hall"  onChange={e=> setOccupation(e.target.value)}/>
      
      {errorEmail && (<SimpleAlerts severity="error">{errorEmail}</SimpleAlerts>)}
      
      <BtRadio id="kitchen" type="radio" value="kitchen" name="occupation" text="Cozinha" htmlFor="kitchen" onChange={e=> setOccupation(e.target.value)}/>
      
      {errorOccupation && (<SimpleAlerts severity="error">{errorOccupation}</SimpleAlerts>)}
      
      {/* <BtRadio
        onChange={handleChange}
        value={form.occupation}
        value1="hall"
        value2="kitchen"
        id="hall"
        id="kitchen"
        label1="Salão"
        label2="Cozinha"
        setValue1={setForm.occupation}
        setValue2={setForm.occupation}
      />
      
      <BtButton name="Cadastrar" /> */}
      
        <div className="container-inf">
          <p>"Tem uma conta?<Link to="/">Conecte-se!"</Link></p>
        </div>
		</form>
  )
}
export default FormRegister;
