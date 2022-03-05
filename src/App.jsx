import { Link, Outlet } from 'react-router-dom'
import Navbar from './components/navbar/navbar'

import './App.css';

export default function App() {
    return (
        <div>
            <Navbar />

            <div style={{position: 'relative', top: '75px'}}>
                <Outlet />
            </div>
        </div>
    );
}