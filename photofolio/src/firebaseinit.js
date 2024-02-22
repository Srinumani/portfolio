// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUedZJhCaHFZK016Qq54X7apXhjOfN39s",
  authDomain: "photofolio-57f86.firebaseapp.com",
  projectId: "photofolio-57f86",
  storageBucket: "photofolio-57f86.appspot.com",
  messagingSenderId: "173004863401",
  appId: "1:173004863401:web:82b991da3787ebdacdf6b8",
  measurementId: "G-VEBQN3YLH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)