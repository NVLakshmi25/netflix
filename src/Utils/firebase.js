// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO2exHm2EwbPPH9QRG02AKBW5CC2w8pDw",
  authDomain: "netflixgpt-c50a2.firebaseapp.com",
  projectId: "netflixgpt-c50a2",
  storageBucket: "netflixgpt-c50a2.firebasestorage.app",
  messagingSenderId: "58005236219",
  appId: "1:58005236219:web:9a6cc42d2ab38a9707035e",
  measurementId: "G-QGM6VF6VLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();