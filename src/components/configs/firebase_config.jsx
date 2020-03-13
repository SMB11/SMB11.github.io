import Firebase from "firebase";

let config = {
  apiKey: "AIzaSyCnOala6JYzqBieVQJyusUD2f2BTq0ECas",
  authDomain: "react-c4056.firebaseapp.com",
  databaseURL: "https://react-c4056.firebaseio.com",
  projectId: "react-c4056",
  storageBucket: "react-c4056.appspot.com",
  messagingSenderId: "676700030205",
  appId: "1:676700030205:web:8a4e52e314cd63855dea94",
  measurementId: "G-RK1KG9ECXP"
};
let app = Firebase.initializeApp(config);
// firebase.analytics();
export const db = app.database();
export const auth = app.auth();
export const fs = app.firestore();
