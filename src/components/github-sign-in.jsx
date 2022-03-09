import { signInWithPopup, } from "firebase/auth";
import {auth, provider, db} from '../firebase'
import { query, getDocs, collection, where, addDoc} from 'firebase/firestore'


const signInGithub = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const queryDb = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(queryDb);

        if (docs.docs.length === 0 ) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'Github',
                email: user.email
            });
        }
    } catch (e) {
        console.error(e);
        alert(e);
    }
}

export { signInGithub};
