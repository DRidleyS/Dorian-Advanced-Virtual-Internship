// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
} from "firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously as fbSignInAnonymously,
  signInWithPopup as fbSignInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

// Thin wrappers (used in UI)
export const signUpWithEmail = (email: string, password: string) =>
  fbCreateUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email: string, password: string) =>
  fbSignInWithEmailAndPassword(auth, email, password);
export const signInAnonymously = () => fbSignInAnonymously(auth);
export const signInWithGooglePopup = () =>
  fbSignInWithPopup(auth, googleProvider);
export const signOutUser = () => fbSignOut(auth);
export { onAuthStateChanged };
export type { FirebaseUser };
