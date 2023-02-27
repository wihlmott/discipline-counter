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

export const retrieveClass = async (classGroup) => {
  console.log(`fetching class -- ${classGroup}`);

  const collectionRef = collection(db, classGroup);
  const classes = [];
  try {
    const snapshot = await getDocs(collectionRef);
    snapshot.docs.forEach((doc) => {
      classes.push({ ...doc.data().entry, id: doc.id });
    });
  } catch (err) {
    console.log(err + ` -- error fetching classes`);
  }
  return classes;
};

export const setScore = async (classGroup, date, entry) => {
  console.log(`setting score`);

  const dateEntry = date
    .toLocaleString("default", {
      day: "numeric",
      month: "short",
    })
    .replaceAll(" ", "");

  try {
    await setDoc(
      doc(db, classGroup, `${classGroup}--${dateEntry}`),
      {
        entry: entry,
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err + `-- error setting score`);
  }
};
