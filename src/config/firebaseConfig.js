// Import necessary Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app"; // To initialize Firebase
import { getFirestore } from "firebase/firestore"; // To initialize Firestore


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

// Initialize Firebase app only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Export the Firestore instance for use in other parts of your app
export { db };
