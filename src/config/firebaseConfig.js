// Import the Firebase modules you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjemxEchnKiViXvPp-EV07GAuvethXoQU",
  authDomain: "chillax-cafe-e6d36.firebaseapp.com",
  projectId: "chillax-cafe-e6d36",
  storageBucket: "chillax-cafe-e6d36.appspot.com",
  messagingSenderId: "706468239595",
  appId: "1:706468239595:web:70483b71e3b6d4296286ae",
  measurementId: "G-S4P0PGT0B8" // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
