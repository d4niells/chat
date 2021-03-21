import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "super-chat-3f0a9.firebaseapp.com",
  projectId: "super-chat-3f0a9",
  storageBucket: "super-chat-3f0a9.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-3B997LC8DF"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export default firebase;
export { auth, firestore };