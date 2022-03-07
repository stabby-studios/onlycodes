import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/header/header';
import { getTokenFromLocalStorage } from '../util/token';


const Home = () => {

    const [token, setToken] = React.useState(getTokenFromLocalStorage());

    if (token) {
        return <Navigate to={'/feed'} />
    }

    return (
        <React.Fragment>
            <Header />
        </React.Fragment>
    )
}

export default Home;