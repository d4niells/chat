import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const auth = firebase.auth();
const firestore = firebase.firestore();

firebase.initializeApp({
  apiKey: "AIzaSyAM2MWUt3G3IfNRaEvI1DYwHmLALES5FYI",
  authDomain: "super-chat-3f0a9.firebaseapp.com",
  projectId: "super-chat-3f0a9",
  storageBucket: "super-chat-3f0a9.appspot.com",
  messagingSenderId: "604109296753",
  appId: "1:604109296753:web:b874b208a707326d45f7d0",
  measurementId: "G-3B997LC8DF"
});

export default firebase;
export { auth, firestore };