import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjYP6DLcE7OlzzhvdSeEf0ncAuhBVneOY",
  authDomain: "letmeask-a875f.firebaseapp.com",
  databaseURL: "https://letmeask-a875f-default-rtdb.firebaseio.com",
  projectId: "letmeask-a875f",
  storageBucket: "letmeask-a875f.appspot.com",
  messagingSenderId: "552940035247",
  appId: "1:552940035247:web:2b3aa22dec3eed02f0485a"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { firebase, auth};