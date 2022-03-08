import React, {useEffect} from 'react';
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return navigate('/login')
        }
    })

    return (
        <div>
            <h3>Settings</h3>
        </div>
    )
}

export default Settings;