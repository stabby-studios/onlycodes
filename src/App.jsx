import { Link, Outlet } from 'react-router-dom'
import Navbar from './components/navbar/navbar';

import './App.css';

export default function App() {
    return (
        <div>
            <Navbar />

            <Outlet />
        </div>
    );
}