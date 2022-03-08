import React, { useCallback, useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase'
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Team = () => {

    const [user, loading, error] = useAuthState(auth);
    const [usersList, setUsersList] = useState([]);

    const navigate = useNavigate();

    const fetchUsers = useCallback( async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"), )
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })

            setUsersList(data)

        } catch (e) {
            console.error(error)
            alert(e)
        }
    }, [error]);

    useEffect(() => {
        if (loading) return

        if (!user) {
            console.log('no user??')
            return navigate("/login")
        }
        fetchUsers();

    }, [fetchUsers, loading, navigate, user])

    return (
        <div>
            <h3>Team</h3>

            <ul>
                {
                    usersList.map((user) => {
                        return <li key={user}>{user.uid} - {user.email}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Team;