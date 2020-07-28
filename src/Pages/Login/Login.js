import React from 'react';
import './Login.css';
import FormLogin from '../../Components/FormLogin.js';
import Logo from '../../Components/Logo.js';

// import Firebase from 'Firebase';

export const Login = () => {
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
				<Logo />
			</div>
			<div className="container-form">
				<FormLogin />
			</div>
		</div>
	);
};
export default Login;
