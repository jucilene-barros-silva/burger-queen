import { useEffect } from 'react';
import firebase from '../Firebase.js';
import 'firebase/auth';
import 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const UseEffect = () =>{
  const navigate = useNavigate();

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
}

export default UseEffect;