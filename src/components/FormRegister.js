import React, { useState } from 'react';
import BtButton from '../Components/Button.js';
import Input from '../Components/Input.js';
import BtRadio from '../Components/BtRadio.js';
import { Link } from 'react-router-dom';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SimpleAlerts from './Alert.js';

const FormRegister = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    occupation: '',
  });

  function handleChange({ target }) {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState(false);

  const handleChangeRadio = (event) => {
    setOccupation(event.target.value);
  };

  const navigate = useNavigate();

  function validation() {
    setError(false);

    let isRight = true;
    if (!form.name) {
      setError('Por favor, preencha seu nome');
      isRight = false;
    }
    if (
      !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
        form.email
      )
    ) {
      setError('Formato de e-mail inválido');
    }
    if (!form.email) {
      setError('Email obrigatório');
      isRight = false;
    }
    if (form.password.length < 5) {
      setError('Sua senha deve ter pelo menos 6 caracteres');
      isRight = false;
    }
    if (!form.password) {
      setError('Sua senha deve ter pelo menos 6 caracteres');
      isRight = false;
    }
    if (!occupation) {
      setError('Escolha uma das opções');
      isRight = false;
    }

    return isRight;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const name = form.name;
    const email = form.email;
    const password = form.password;
    const radio = occupation;

    const isRight = validation();

    if (isRight) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          if (radio === 'hall') {
            navigate('/hall');
          } else {
            navigate('/kitchen');
          }
        })
        .then((res) => {
          const db = firebase.firestore();
          const authUid = firebase.auth().currentUser.uid;
          db.collection('employees')
            .doc(authUid)
            .set({
              userUid: authUid,
              name,
              email,
              occupation,
            })
            .then(
              firebase.auth().currentUser.updateProfile({
                displayName: name,
              })
            )
            .catch((e) => alert('Erro no cadastro'));
        });
    }
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Input
        autoFocus="true"
        id="name"
        name="name"
        label="Name"
        type="text"
        value={form.name}
        onChange={handleChange}
        setValue={setForm.name}
      />

      <Input
        id="email"
        name="email"
        label="E-mail"
        type="email"
        value={form.email}
        onChange={handleChange}
        setValue={setForm.email}
      />

      <Input
        id="password"
        name="password"
        label="Senha"
        type="password"
        value={form.password}
        onChange={handleChange}
        setValue={setForm.password}
      />

      {/* <BtRadio id="hall" type="radio"  value="hall" name="occupation" text="Salão" htmlFor="hall"  onChange={e=> setOccupation(e.target.value)}/>
            
      <BtRadio id="kitchen" type="radio" value="kitchen" name="occupation" text="Cozinha" htmlFor="kitchen" onChange={e=> setOccupation(e.target.value)}/> */}
      <BtRadio value={occupation} onChange={handleChangeRadio} />

      {error && <SimpleAlerts severity="error">{error}</SimpleAlerts>}

      <BtButton name="Cadastrar" />

      <div className="container-inf">
        <p>
          "Tem uma conta?<Link to="/">Conecte-se!"</Link>
        </p>
      </div>
    </form>
  );
};
export default FormRegister;
