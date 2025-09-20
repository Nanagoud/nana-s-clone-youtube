// Import the functions you need from the SDKs you need
import {initializeApp, getApps} from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8ynwt3hrPnWJ5w_3_6QoYVGgGtkzRFrU",
  authDomain: "nana-s-clone-you-tube.firebaseapp.com",
  projectId: "nana-s-clone-you-tube",
  storageBucket: "nana-s-clone-you-tube.firebasestorage.app",
  messagingSenderId: "602224450363",
  appId: "1:602224450363:web:fb98c9b5345e2a3cf6f51e",
  measurementId: "G-LQYY61VXTT"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export {db};