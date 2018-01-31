import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyARAFufDRgcRbJnvYt398W1kB4aztJ4zQM",
  authDomain: "quack-man.firebaseapp.com",
  databaseURL: "https://quack-man.firebaseio.com",
  projectId: "quack-man",
  storageBucket: "",
  messagingSenderId: "4687866973"
};
const firebaseDB = firebase.initializeApp(config);

const Database = firebaseDB.database();

export default Database;
