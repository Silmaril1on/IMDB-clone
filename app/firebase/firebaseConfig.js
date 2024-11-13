import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBL3QhVC75fWEiErMrkb-lklulFwppcDYM",
  authDomain: "movies-comics-8fa4c.firebaseapp.com",
  projectId: "movies-comics-8fa4c",
  storageBucket: "movies-comics-8fa4c.appspot.com",
  messagingSenderId: "591249187033",
  appId: "1:591249187033:web:435b005515e1022ae3dec8",
  measurementId: "G-6MQ74XKSNZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
