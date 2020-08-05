import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5jeSWsQC5iUB3pocuJ6eUh1OugevKwKM",
  authDomain: "burguer-queen-a8030.firebaseapp.com",
  databaseURL: "https://burguer-queen-a8030.firebaseio.com",
  projectId: "burguer-queen-a8030",
  storageBucket: "burguer-queen-a8030.appspot.com",
  messagingSenderId: "828621373470",
  appId: "1:828621373470:web:4075c305e3c7118aad2e0f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
