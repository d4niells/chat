import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyAEUOCECC1xIA_pvI5mEmsKVnFtTqONUME",
  authDomain: "discordo-chat.firebaseapp.com",
  projectId: "discordo-chat",
  storageBucket: "discordo-chat.appspot.com",
  messagingSenderId: "493551592358",
  appId: "1:493551592358:web:a228f75a0f4e45beaae567",
  measurementId: "G-E24YF975BZ"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export default firebase;
export { auth, firestore };