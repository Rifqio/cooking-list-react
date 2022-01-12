import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbeXrCJmx9UKja-yX8RmbOlt-x6shtvkY",
  authDomain: "cooking-session.firebaseapp.com",
  projectId: "cooking-session",
  storageBucket: "cooking-session.appspot.com",
  messagingSenderId: "553314681537",
  appId: "1:553314681537:web:7c03285757f2195f2b8a40",
};

//Firebase init
firebase.initializeApp(firebaseConfig);

//Initialize Services
const projectStorage = firebase.firestore()

export { projectStorage }