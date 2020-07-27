import React, { useState } from 'react';
import logo from '../../img/back.jpg';
import './Login.css';
import { TextField, Button, Link } from '@material-ui/core';

export const Login = () => {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  return (
    <div className="container">
      <div className="container-logo">
        <img src={logo} alt="Logomarca"></img>
      </div>
      <div className="container-form">
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={setEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={setSenha}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              alert('clicado');
            }}
          >
            Acessar
          </Button>
          <div className="container-inf">
            <Link href="#" variant="body2">
              Esqueceu a senha?
            </Link>
            <Link href="#" variant="body2">
              {'Não tem uma conta? Cadastre-se!'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
