import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSTGKt6zghsyCmGrYdyrBXybzdXquzipA",
  authDomain: "starlobby-ac0fe.firebaseapp.com",
  projectId: "starlobby-ac0fe",
  storageBucket: "starlobby-ac0fe.firebasestorage.app",
  messagingSenderId: "147261773052",
  appId: "1:147261773052:web:94a0bc19bca34065c0b379",
  measurementId: "G-8XZDP8QNGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
