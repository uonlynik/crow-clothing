import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
        const userDocRef= doc(db,'users',userAuth.uid);
        const userSnapshot = await getDoc(userDocRef);
        
        if(!userSnapshot.exists()){
            const {displayName, email} = userAuth;
            const createdAt = new Date();
            try {
                await setDoc(userDocRef,{
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