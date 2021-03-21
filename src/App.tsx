import React, { useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, } from 'react-firebase-hooks/firestore';

import firebase, { auth, firestore } from './services/firebase';

import './App.css';

export default function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

function SignOut() {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    auth.currentUser && (
      <div>
        <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
      </div>
    )
  );
}

function ChatRoom() {
  const dummy = useRef<null | HTMLDivElement>(null);

  const [formValue, setFormValue] = useState('');

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(30);

  const [messages] = useCollectionData(query, { idFiekd: 'id' });

  const handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    setFormValue(event.currentTarget.value);
  }

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: auth.currentUser?.uid ?? null,
      photoURL: auth.currentUser?.photoURL ?? ''
    })

    setFormValue('');

    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={handleSendMessage}>
        <input value={formValue} onChange={handleChangeInput} />
        <button type="submit" disabled={!formValue}>🕊️</button>
      </form>
    </div>
  );
}

interface IChatMessage {
  key: number;
  message: firebase.firestore.DocumentData;
}

function ChatMessage(props: IChatMessage) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt={'user-logo'} />
      <p>{text}</p>
    </div>
  );
};
