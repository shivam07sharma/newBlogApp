// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhUFzrEhBSXi_TnicLYKi-MCgniIr4bGI",
  authDomain: "blog-df752.firebaseapp.com",
  projectId: "blog-df752",
  storageBucket: "blog-df752.appspot.com",
  messagingSenderId: "611860614009",
  appId: "1:611860614009:web:dde34b1636063a6ff07da8",
  measurementId: "G-FM6TW3VM76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
