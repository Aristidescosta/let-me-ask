import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBjYP6DLcE7OlzzhvdSeEf0ncAuhBVneOY",
  authDomain: "letmeask-a875f.firebaseapp.com",
  databaseURL: "https://letmeask-a875f-default-rtdb.firebaseio.com",
  projectId: "letmeask-a875f",
  storageBucket: "letmeask-a875f.appspot.com",
  messagingSenderId: "552940035247",
  appId: "1:552940035247:web:2b3aa22dec3eed02f0485a"
};

/* const firebaseConfig = {
  apiKey: "AIzaSyBornHYJK8Jbak1CSeOS6DddrinZDWnS9I",
  authDomain: "let-me-ask-b11e2.firebaseapp.com",
  databaseURL: "https://let-me-ask-b11e2-default-rtdb.firebaseio.com",
  projectId: "let-me-ask-b11e2",
  storageBucket: "let-me-ask-b11e2.appspot.com",
  messagingSenderId: "577103658056",
  appId: "1:577103658056:web:77eb4c4a2b102a36aaec7d"
}; */

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database};