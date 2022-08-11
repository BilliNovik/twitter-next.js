import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "twitter-v1-593e0.firebaseapp.com",
    projectId: "twitter-v1-593e0",
    storageBucket: "twitter-v1-593e0.appspot.com",
    messagingSenderId: "77591295546",
    appId: "1:77591295546:web:b417caf13d80acabffe703"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const db = getFirestore()
export const storage = getStorage()