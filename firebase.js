import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAxFA3eUeGorcTXH1uI5ySuRF1l1MfUvkc",
    authDomain: "geocoffeapp.firebaseapp.com",
    projectId: "geocoffeapp",
    storageBucket: "geocoffeapp.firebasestorage.app",
    messagingSenderId: "64781373661",
    appId: "1:64781373661:web:d7eb774766aea2c51f0b34",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword };