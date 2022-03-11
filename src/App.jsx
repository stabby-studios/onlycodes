import React, { useCallback, useEffect, useState } from 'react';
import { Outlet,  useNavigate } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import { auth, db} from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import { collection, getDocs } from 'firebase/firestore';


export default function App() {

    const [user, loading, error] = useAuthState(auth);
    const nav = useNavigate()
    const [authedUser, setAuthedUser] = useState({});

    const fetchUser = useCallback(async () => {
        try {
            const userSnapshot = await getDocs(collection(db, "users"));
            const data = [];

            userSnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            if (!user) {
                return;
            } else {
                const u = data.find(foundUser => foundUser['uid'] === user.uid);
                setAuthedUser(u);
            }
        } catch (e) {
            console.error(error);
            alert(e);
        }
    }, [error, user]);

    useEffect(() => {

        if (loading) return;

        if (!user) {
            return <>{nav('/login')}</>
        }

        fetchUser()

    }, [user, loading, nav, fetchUser])


    return (
        <div>
            <Navbar user={authedUser} />
            <div style={{ position: 'relative', top: '95px' }}>
                <Outlet />
            </div>
        </div>
    );
}