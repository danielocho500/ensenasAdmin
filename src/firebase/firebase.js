import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqHE7ZVaqyHAswybZ9q9tIMduBu_671A4",
  authDomain: "ensenas-9dcad.firebaseapp.com",
  projectId: "ensenas-9dcad",
  storageBucket: "ensenas-9dcad.appspot.com",
  messagingSenderId: "317140904630",
  appId: "1:317140904630:web:20a99aa038083dc9d29417"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);