let firebaseConfig = {
    apiKey: "AIzaSyDTubPoKiNcGdf6j-uG2Isj9V20tCiKWCw",
    authDomain: "resume-builder-demo-a8f26.firebaseapp.com",
    databaseURL: "https://resume-builder-demo-a8f26.firebaseio.com",
    projectId: "resume-builder-demo-a8f26",
    storageBucket: "resume-builder-demo-a8f26.appspot.com",
    messagingSenderId: "872651765937",
    appId: "1:872651765937:web:728d81d237998c87e3ca90"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let auth = firebase.auth();
  let db = firebase.firestore();