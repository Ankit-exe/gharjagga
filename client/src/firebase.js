// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-c884a.firebaseapp.com",
  projectId: "mern-state-c884a",
  storageBucket: "mern-state-c884a.appspot.com",
  messagingSenderId: "713869590310",
  appId: "1:713869590310:web:581a957df09bb3a2358be7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
