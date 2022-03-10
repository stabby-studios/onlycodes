// Firebase
import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// TODO: Add sdks for what i wanna use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD9cpc6QLJ70qSLtd-Qwv__VuOJ0ohRNNE",
    authDomain: "onlycodes-backend.firebaseapp.com",
    projectId: "onlycodes-backend",
    storageBucket: "onlycodes-backend.appspot.com",
    messagingSenderId: "793062804001",
    appId: "1:793062804001:web:b4bf712d36ac2f3139f160",
    measurementId: "G-58Q73121FY"
};

const app = initializeApp(firebaseConfig);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider()
const twitterProvider = new TwitterAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

export {
    app, githubProvider, googleProvider, twitterProvider, auth, db
}