import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvqc1U_txd3yJy1SpThO_7IQTZE-LNJQk",
  authDomain: "clone-e4359.firebaseapp.com",
  projectId: "clone-e4359",
  storageBucket: "clone-e4359.appspot.com",
  messagingSenderId: "91766276714",
  appId: "1:91766276714:web:20cb9b59bf4b0db95b8013"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };