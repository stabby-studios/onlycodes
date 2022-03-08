import React, {useState} from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import { validateToken } from './util/token';
import { createDummyToken } from './util/token';

import './App.css';

export default function App() {

    const [token, setToken] = useState();

    createDummyToken()

    React.useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            validateToken(token);
            setToken(token);
        } catch (e) {
            console.log(e)
        }
   
    }, []);

    if (token === null || token === '') {
            return <Navigate to={'/'} />
    }

    return (
        <div>
            <Navbar />
            <div style={{ position: 'relative', top: '75px' }}>
                <Outlet />
            </div>
        </div>
    );
}