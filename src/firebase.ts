// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUdTwz1K4e7VnwNf28whwHmOM4UbjpPfE",
  authDomain: "physics-80df1.firebaseapp.com",
  projectId: "physics-80df1",
  storageBucket: "physics-80df1.appspot.com",
  messagingSenderId: "1016916349456",
  appId: "1:1016916349456:web:decd370119df231dfdb095",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
