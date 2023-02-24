import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABaT5fzMFmyPSUkWLB1SIW3XHfBWZUDxY",
  authDomain: "discipline-counter.firebaseapp.com",
  projectId: "discipline-counter",
  storageBucket: "discipline-counter.appspot.com",
  messagingSenderId: "855659707264",
  appId: "1:855659707264:web:dc0ef92077dc0a349c5f65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const collectionRef = collection(db, "classes");

export const retrieveClasses = async () => {
  console.log(`fetching classes`);

  const classes = [];
  try {
    const snapshot = await getDocs(collectionRef);
    snapshot.docs.forEach((doc) => {
      classes.push({ ...doc.data(), id: doc.id });
    });
  } catch (err) {
    console.log(err + ` -- error fetching classes`);
  }
  return classes;
};

export const setScore = async (classGroup, date, entry) => {
  console.log(`setting score`);

  try {
    await setDoc(
      doc(db, classGroup, date),
      {
        entry: entry,
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err + `-- error setting score`);
  }
};
