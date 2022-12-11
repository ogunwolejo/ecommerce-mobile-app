// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG9bSRplsjh9a1P8WYw83oi50_1A8oYo8",
  authDomain: "ecomm-274c0.firebaseapp.com",
  projectId: "ecomm-274c0",
  storageBucket: "ecomm-274c0.appspot.com",
  messagingSenderId: "832301098578",
  appId: "1:832301098578:web:5bb95e41274bf98da9218b",
  measurementId: "G-XNTPPPC6TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);