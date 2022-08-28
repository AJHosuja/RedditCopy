import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB-Amz_Zjt9UskmsG3KTAWM0p238gNpzfQ",
  authDomain: "redditcopy-89063.firebaseapp.com",
  projectId: "redditcopy-89063",
  storageBucket: "redditcopy-89063.appspot.com",
  messagingSenderId: "286854896908",
  appId: "1:286854896908:web:7d5c2924e0e8775b05fd29",
  measurementId: "G-J38BZ9ZRV2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth()