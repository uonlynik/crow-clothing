import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD2uru4aRiF4zS3FVLBIQNbUWItpbyNP5w",
    authDomain: "crwn-clothing-db-f57c1.firebaseapp.com",
    projectId: "crwn-clothing-db-f57c1",
    storageBucket: "crwn-clothing-db-f57c1.appspot.com",
    messagingSenderId: "338041062462",
    appId: "1:338041062462:web:9af7fead135961ac01fd6f",
    measurementId: "G-DQ8B8TXN9H"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { email, displayName } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log("error creating the user", error.messsage);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);