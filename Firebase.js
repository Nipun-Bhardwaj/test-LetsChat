import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf9LTMhT22_lpCAJWtMSgWOrE-DGps33A",
  authDomain: "wp-clone-595cb.firebaseapp.com",
  projectId: "wp-clone-595cb",
  storageBucket: "wp-clone-595cb.appspot.com",
  messagingSenderId: "182769138753",
  appId: "1:182769138753:web:c44a121b846c29c3529ac0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
