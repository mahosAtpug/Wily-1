import  * as firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyAKjB_tLuNVpGK5sr4wcotpBnVTPUK2Zcw",
    authDomain: "wily-ae41c.firebaseapp.com",
    projectId: "wily-ae41c",
    storageBucket: "wily-ae41c.appspot.com",
    messagingSenderId: "727762307450",
    appId: "1:727762307450:web:07688a27243b5650896ec3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();