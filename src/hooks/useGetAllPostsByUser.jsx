import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";

const useGetAllPostsByUser = (userUid) => {

    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        if (userUid === undefined) return;

        console.log(userUid)

        const fetchAllPosts = async () => {
            // const userPostsRef = query(collection(db, "posts", where(new FieldPath("user", "uid"), "==", userUid)))

            const userRef = query(collection(db, "posts"), where("user.uid", "==", userUid))

            const snapshot = await getDocs(userRef);

            const d = []

            if (snapshot) {
                snapshot.docs.map((doc) => {
                     d.push({postDocument: doc.id, post: doc.data()})
                     return d;
                })

                setUserPosts(d)
            } else {
                setUserPosts({ error: 'no posts found' })
            }
        }
        fetchAllPosts()
        .catch(console.error)
    }, [userUid]);

    return [userPosts]
}

export default useGetAllPostsByUser