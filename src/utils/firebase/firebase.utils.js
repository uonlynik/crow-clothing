// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2uru4aRiF4zS3FVLBIQNbUWItpbyNP5w",
    authDomain: "crwn-clothing-db-f57c1.firebaseapp.com",
    projectId: "crwn-clothing-db-f57c1",
    storageBucket: "crwn-clothing-db-f57c1.appspot.com",
    messagingSenderId: "338041062462",
    appId: "1:338041062462:web:9af7fead135961ac01fd6f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
