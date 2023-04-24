// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMrELSZsJmTXjjwk_pumgt1FXGZ0CwoTw",
  authDomain: "bestappintheworld-67a98.firebaseapp.com",
  projectId: "bestappintheworld-67a98",
  storageBucket: "bestappintheworld-67a98.appspot.com",
  messagingSenderId: "36541471714",
  appId: "1:36541471714:web:e3d8ed084746c19caa37bb",
  measurementId: "G-VXJY7PWTEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);