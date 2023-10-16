import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,  signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCL1giuajreNL7MaAlISBR_gr5AsmYW2p0",
  authDomain: "capstone-third-year.firebaseapp.com",
  projectId: "capstone-third-year",
  storageBucket: "capstone-third-year.appspot.com",
  messagingSenderId: "1037621155883",
  appId: "1:1037621155883:web:3b6c0804c8014b8cb2b26e",
  measurementId: "G-ZS9X3M1RQK"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider).then((data) => {
      const name = data.user.displayName;
      const email = data.user.email;
      const profilePic = data.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);

      window.location.href = "/home";
    }).catch((error) => {
      console.log(error)
    })
 } catch (error) {
  console.log(error);
 }
}


export { auth, signInWithGoogle, db };
