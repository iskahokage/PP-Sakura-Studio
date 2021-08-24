import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './styles/style.css';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


firebase.initializeApp({
  apiKey: "AIzaSyAATU0CjCxLa9g3r0asV065QgbtzrValxs",
  authDomain: "iskahokage-sakurastudio.firebaseapp.com",
  projectId: "iskahokage-sakurastudio",
  storageBucket: "iskahokage-sakurastudio.appspot.com",
  messagingSenderId: "121883579411",
  appId: "1:121883579411:web:0423345423350d90a71be6"
});


export const authContext = createContext(null)
const auth = firebase.auth()
const firestore = firebase.firestore();



ReactDOM.render(
  <authContext.Provider value={{
    firebase,
    auth,
    firestore,
  }}>
    <App />
  </authContext.Provider>,
  document.getElementById('root')
);
