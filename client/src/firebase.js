import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADUBC8fY-dmuUL3uTshJTiMyKFxnOGz94",
  authDomain: "discute-d033d.firebaseapp.com",
  projectId: "discute-d033d",
  storageBucket: "discute-d033d.appspot.com",
  messagingSenderId: "665188004303",
  appId: "1:665188004303:web:a98f80a2c5c846213a62ba",
  measurementId: "G-DK3GC773K5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
