import React, { useState, useEffect } from 'react';
import BtButton from '../../src/Components/Button.js';
import Input from '../../src/Components/Input.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import SimpleAlerts from './Alert.js';

const FormLogin = () => {
  const navigate = useNavigate();
	const [error, setError] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('employees')
          .doc(user.uid)
          .get()
          .then((user) => {
            if (user.data().occupation === 'hall') {
              navigate('/hall');
            } else {
              navigate('/kitchen');
            }
          });
      } else {
        navigate('/');
      }
    });
  }, [navigate]);

  const [form, setform] = useState({
    email: '',
    password: '',
  });

  function handleChange({ target }) {
    const { id, value } = target;
    console.log(setform({ ...form, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const email = form.email;
    const password = form.password;

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => alert('Logado!!!'))
			.then((user) => console.log(user.user.uid))
			// .catch((error)=> alert('error'))
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
        id="email"
        name="email"
        label="E-mail"
        type="email"
        value={form.email}
        onChange={handleChange}
        setValue={setform.email}
      />
      {error && <SimpleAlerts severity="error">{error}</SimpleAlerts>}

      <Input
        id="password"
        name="password"
        label="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        setValue={setform.password}
      />
      {/* {error && <SimpleAlerts severity="error">{error}</SimpleAlerts>} */}

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
