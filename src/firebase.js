import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics(); Por alguna razon si esta linea no esta comentada por mas que la app compile no se ve nada en el navegador.

// utils
const db = firebase.firestore();

// collection references
const topics = db.collection("topics");
const levels = db.collection("levels");


// export utils/refs
export {
  firebase,
  db,
  topics,
  levels
};