import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/navbar'

import './App.css';

export default function App() {
    const user = {}
    return (
        <div>
            <Navbar />
            <div style={{ position: 'relative', top: '75px' }}>
                {user ? <Outlet /> : <Navigate to={'/login'} />}
            </div>
        </div>
    );
}