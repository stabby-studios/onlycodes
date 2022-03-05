import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

export default class Navbar extends React.Component {

    render() {
        return (
            <div className="navbar">
                <div className="navbar-home">
                    <Link className='navbar-home-link' to="/">Home</Link>
                </div>
                <div className="navbar-links">
                    <Link className='navbar-link' to="/about">About</Link>
                    <Link className='navbar-link'  to="/login">Login</Link>
                </div>
            </div>
        )
    }
}