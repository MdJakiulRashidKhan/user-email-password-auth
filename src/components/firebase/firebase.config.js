// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdf9P3ReinaF6ds4WY_f1QAsDvPKaYQn0",
  authDomain: "user-email-password-auth-3e484.firebaseapp.com",
  projectId: "user-email-password-auth-3e484",
  storageBucket: "user-email-password-auth-3e484.appspot.com",
  messagingSenderId: "730285163864",
  appId: "1:730285163864:web:1bb2b4bbeecf631af8112d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;