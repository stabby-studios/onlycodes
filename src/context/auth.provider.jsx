import { useState } from "react"
import AuthContext from "./auth";
import { Navigate } from "react-router-dom";

const fakeAuth = () => {
     return 'some-token-to-be-generated-or-something'
}

const AuthProvider = ({children}) => {
    const [token, setToken] = useState();

    const handleLogin = () => {
        const token =   fakeAuth();
        setToken(token);
        console.log('logging in with token: ' +  token);
        localStorage.setItem('token', token);
    };

    const handleLogout = () => {
        console.log('current token ' + token)
        console.log('started log out')
        setToken(null);
        localStorage.removeItem('token');
    };

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;

