import { signInWithPopup, } from "firebase/auth";
import {auth, githubProvider, googleProvider, twitterProvider, db} from '../firebase'
import { query, getDocs, collection, where, addDoc} from 'firebase/firestore'


const signInGithub = async () => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;
        const queryDb = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(queryDb);

        if (docs.docs.length === 0 ) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.reloadUserInfo.screenName,
                authProvider: 'Github',
                email: user.email,
                avatar: user.photoURL,
                followers: {
                    followerId: []
                },
                following: {
                    followedUsers: []
                },
                bio: "",
                socials: {
                    twitter: '',
                    instagram: '',
                    stackoverflow: '',
                    stackexchange: '',
                    github: user.reloadUserInfo.screenName
                }
            });
        }
    } catch (e) {
        console.error(e);
        alert(e);
    }
}

const signInGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const queryDb = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(queryDb);

        if (docs.docs.length === 0 ) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'Google',
                email: user.email,
                avatar: user.photoURL,
                followers: {
                    followerId: []
                },
                following: {
                    followedUsers: []
                },
                bio: "",
                socials: {
                    twitter: '',
                    instagram: '',
                    stackoverflow: '',
                    stackexchange: '',
                    github: ''
                }
            });
        }
    } catch (e) {
        console.error(e);
        alert(e);
    }
}

const signInTwitter = async () => {
    try {
        const result = await signInWithPopup(auth, twitterProvider);
        const user = result.user;
        const queryDb = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(queryDb);

        if (docs.docs.length === 0 ) {
            await addDoc(collection(db, 'users'), {
                //docId: docs.docs[0].id,
                uid: user.uid,
                name: user.reloadUserInfo.screenName,
                authProvider: 'twitter',
                email: user.email,
                avatar: user.photoURL,
                followers: {
                    followerId: []
                },
                following: {
                    followedUsers: []
                },
                bio: "",
                socials: {
                    twitter: user.reloadUserInfo.screenName,
                    instagram: '',
                    stackoverflow: '',
                    stackexchange: '',
                    github: ''
                }
            });
        }
    } catch (e) {
        console.error(e);
        alert(e);
    }
}


export { signInGoogle, signInGithub, signInTwitter};
