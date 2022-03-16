import {collection, getDocs, limit, query, where} from 'firebase/firestore'
import {useState, useEffect} from 'react'
import { db } from '../firebase';

const useDocumentId = (profileId) => {

    const [docId, setDocId] = useState(null)

    useEffect( () => {

        if (profileId === undefined) return

        const fetchDocumentId = async () => {
            const userRef = query(collection(db, "users"), limit(1), where("uid", "==", profileId))

            const snapshot = await getDocs(userRef)

            if (snapshot) {
                setDocId(snapshot.docs[0].id)
            } else {
                setDocId({error: 'No document found'})
            }
        }

        fetchDocumentId()
            .catch(console.error)

    }, [profileId]);

    return [docId];
}

export default useDocumentId