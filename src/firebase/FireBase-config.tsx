// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage } from "firebase/storage"



const firebaseConfig = {
  // apiKey: "AIzaSyCXdLpHqKc5y6lh14Y4ZgWGO5KZUmbzEw4",
  // authDomain: "vrkout-dd122.firebaseapp.com",
  // projectId: "vrkout-dd122",
  // storageBucket: "vrkout-dd122.appspot.com",
  // messagingSenderId: "23311467175",
  // appId: "1:23311467175:web:0669e02cd565028f5ed182",
  // measurementId: "G-E60MM6X7R8"
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain:  process.env.REACT_APP_AUTH_DOMAIN,
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId:  process.env.REACT_APP_ID,
  measurementId:  process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);