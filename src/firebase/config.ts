import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDO8KgYtnKq_EycY9LlkDU7iPAUroKmKr4",
  authDomain: "chemistry-beacon.firebaseapp.com",
  projectId: "chemistry-beacon",
  storageBucket: "chemistry-beacon.firebasestorage.app",
  messagingSenderId: "428495762206",
  appId: "1:428495762206:web:2b5284dcb4bed54ca20f0f",
  measurementId: "G-7VNXL8585X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Set auth persistence to keep users logged in
setPersistence(auth, browserLocalPersistence).catch(console.error);

export default app;
