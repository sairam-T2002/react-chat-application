import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMIB_aDY6ZKqe2MjUKY2lbJOUPZXsZsUU",
  authDomain: "central-muse-405408.firebaseapp.com",
  databaseURL:
    "https://central-muse-405408-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "central-muse-405408",
  storageBucket: "central-muse-405408.appspot.com",
  messagingSenderId: "156551463407",
  appId: "1:156551463407:web:980c63047d998f3049b61a",
  measurementId: "G-GVZW9WBJDR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
