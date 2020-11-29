import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyALq17kw_GwXGk-OiYUKcyH4uM_sNbCB_g",
    authDomain: "resume-builder-cd2de.firebaseapp.com",
    databaseURL: "https://resume-builder-cd2de.firebaseio.com",
    projectId: "resume-builder-cd2de",
    storageBucket: "resume-builder-cd2de.appspot.com",
    messagingSenderId: "2356437146",
    appId: "1:2356437146:web:63539eea0c9ed1db45ff23"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth , db , provider , firebaseApp};
