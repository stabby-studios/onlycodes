import React, { useEffect } from 'react';
import { Outlet,  useNavigate } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import { auth} from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';

export default function App() {

    const [user, loading] = useAuthState(auth);
    const nav = useNavigate()

    useEffect(() => {

        if (loading) return;

        if (!user) {
            return <>{nav('/login')}</>
        }
    })


    return (
        <div>
            <Navbar user={user} />
            <div style={{ position: 'relative', top: '75px' }}>
                <Outlet />
            </div>
        </div>
    );
}