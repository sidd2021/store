import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions"; // for cloud functions
import firebase from "firebase/app";
var firebaseConfig = {
  apiKey: "AIzaSyBMpXgGhSrXOalNrZKz_VTYEnzD9Z-Ch2k",
  authDomain: "task3-ef464.firebaseapp.com",
  databaseURL: "https://task3-ef464-default-rtdb.firebaseio.com",
  projectId: "task3-ef464",
  storageBucket: "task3-ef464.appspot.com",
  messagingSenderId: "239168878366",
  appId: "1:239168878366:web:d428b2efa6cab0342d7b0f",
  measurementId: "G-VDZT4C6T72",
};

export default firebase.initializeApp(firebaseConfig);
