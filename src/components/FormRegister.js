import React, { useState } from 'react';
import BtButton from '../Components/Button.js';
import Input from '../Components/Input.js';
import BtRadio from '../Components/BtRadio.js';
import { Link } from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const navigate = useNavigate();
  
  const [ form, setform ] = useState({
		name: '',
    email: '',
    occupation: '',
  })
  
  // const [ occupation, setOccupation ] = useState('');

  function handleChange({ target }) {
    const {name, value} = target;
    setform({ ...form, [name]: value})
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const name = form.name;
    const email = form.email;
    const password = form.password;
    const occupation = form.occupation;
    
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {   
      alert('Cadastrado')
        if(occupation === 'hall') {
        navigate('/hall')      
      
      } else {
        navigate('/kitchen')
      }
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

  return (

    <form noValidate autoComplete="off"  onSubmit={handleSubmit} >

      <Input id="name" name="name" label="Name" type="text" value={form.name} onChange={handleChange} setValue={setform.name} autofocus />

      <Input id="email" name="email" label="E-mail" type="email" value={form.email} onChange={handleChange} setValue={setform.email}  />

      <Input id="password" name="password" label="Senha" type="password" value={form.password} onChange={handleChange}  setValue={setform.password} />

      <BtRadio id="hall" type="radio"  value='hall' name="radio" text="Salão" onChange={handleChange}  setValue={setform.occupation} />

      <BtRadio id="kitchen" type="radio" value='kitcken' name="radio" text="Cozinha" onChange={handleChange} setValue={setform.occupation}/>      

      <BtButton name="Cadastrar" />
      
        <div className="container-inf">
          <p>"Tem uma conta?<Link to="/">Conecte-se!"</Link></p>
        </div>
		</form>
  )
}
export default FormRegister;