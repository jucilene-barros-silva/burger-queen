import 'firebase/firestore';
import firebase from '../Firebase.js';

function GetMenu() {
  return firebase.firestore().collection('manha').doc('pedido').get()
   .then((res)=> console.log(res)) 
 }

export default GetMenu;
