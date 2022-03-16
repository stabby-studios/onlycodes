import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"

const useGetPost = (postId) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const getPostSnapshot = async () => {
            
            const snapshot = await getDoc(doc(db, "posts", postId))

            if (snapshot.exists) {
                setData(snapshot.data())
            } else {
                setData({
                    error: 'No post found'
                })
            }
        }

        getPostSnapshot()
    }, [postId])

    return [data]
}

export default useGetPost