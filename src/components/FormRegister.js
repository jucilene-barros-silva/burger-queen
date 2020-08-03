import React, { useState } from 'react';
import BtButton from '../Components/Button.js';
import Input from '../Components/Input.js';
import BtRadio from '../Components/BtRadio.js';
import { Link } from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const FormRegister = () => {
  const navigate = useNavigate();
  const [ form, setform ] = useState({
		name: '',
		email: '',
		password: '',
	})

  function handleChange({ target }) {
    const {id, value} = target;
    console.log(setform({ ...form, [id]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const name = form.name;
    const email = form.email;
    const password = form.password;

  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      alert("Usuário Cadastrado")
      navigate('/salao') })
    .then((res) => {
      const db = firebase.firestore();
      const authUid = firebase.auth().currentUser.uid;
      db.collection('employees').doc(authUid).set({
        userUid: authUid,
        name,
        email,
      })
    .catch((e) => alert("Erro no cadastro"))
    })
  };    

  return (

    <form noValidate autoComplete="off"  onSubmit={handleSubmit} >

      <Input id="name" name="name" label="Name" type="text" value={form.name} onChange={handleChange} setValue={setform.name} />

      <Input id="email" name="email" label="E-mail" type="email" value={form.email} onChange={handleChange} setValue={setform.email}  />

      <Input id="password" name="password" label="Senha" type="password" value={form.password} onChange={handleChange}  setValue={setform.password} />

      <BtRadio
        value1="setSalao"
        value2="setCozinha"
        label1="Salão"
        label2="Cozinha"      
      />

      <BtButton name="Cadastrar" />
      
        <div className="container-inf">
          <p>"Tem uma conta?<Link to='/'>Conecte-se!"</Link></p>
        </div>
		</form>
  )
}
export default FormRegister;