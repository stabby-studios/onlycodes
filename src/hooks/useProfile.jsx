import { collection, getDocs } from 'firebase/firestore';
import {useState, useEffect} from 'react'
import { db } from '../firebase';

const useProfile = (profileId) => {
    const [data, setData] = useState([]);

    useEffect( () => {
        const fetchProfile = async () => {
            const profileSnapshot = await getDocs(collection(db, "users"))
            const d = []

            profileSnapshot.forEach((doc) => {
                d.push(doc.data())
            })

            const found =  await d.find(p => p['uid'] === profileId)

            setData(found)
        }

        fetchProfile()
            .catch(console.error)
    }, [profileId]);

    return [data]
}

export default useProfile