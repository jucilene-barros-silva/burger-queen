import React, { useState} from 'react';
import BtButton from '../../src/Components/Button.js';
import Input from '../../src/Components/Input.js';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import SimpleAlerts from './Alert.js';

function findUserRole(uid) {
 return firebase.firestore().collection('employees').doc(uid).get()
  .then((res)=> res.data().occupation) 
}


const FormLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);


  const [form, setform] = useState({
    email: '',
    password: '',
  });

  function handleChange({ target }) {
    const { id, value } = target;
    console.log(setform({ ...form, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const email = form.email;
    const password = form.password;

   firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => findUserRole(res.user.uid))
      .then((user) => {
      if(user === 'hall'){
        navigate('/hall')
    } else {
      navigate('/kitchen')
    }})
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          return setError('Senha incorreta!');
        }
        if (error.code === 'auth/user-not-found') {
          return setError('E-mail não localizado!');
        }
        if (error.code === 'auth/invalid-email') {
          return setError('E-mail invalido!');
        } else {
          return setError(`Codigo de error: ${error.code}`);
        }
      });
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Input
        autoFocus ="true"
        id="email"
        name="email"
        label="E-mail"
        type="email"
        value={form.email}
        onChange={handleChange}
        setValue={setform.email}
      />

      <Input
        id="password"
        name="password"
        label="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        setValue={setform.password}
      />
      {error && <SimpleAlerts severity="error">{error}</SimpleAlerts>}<br/>

      <BtButton name="Acessar" />

      <div className="container-inf">
        <p>Esqueceu a senha?</p>{' '}
        <p>
          Não tem uma conta? <Link to="register"> Cadastre-se!</Link>
        </p>
      </div>
    </form>
  );
};
export default FormLogin;
