import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* main Element */
import App from './App';

/* Route Elements */
import Home from './routes/home';
import Feed from './routes/feed/feed';
import Settings from './routes/settings';
import Team from './routes/team';
import Profile from './routes/profile/profile';
import Login from './routes/auth/login';
import Register from './routes/auth/register';

/* Chakra ui */
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';


/*  Logging etc  */
import reportWebVitals from './reportWebVitals';

import './index.css'
import theme from './theme';


/* Chakra ui theming */


const root = document.getElementById('root');
render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<Feed />} />
                    <Route path="/Feed" element={<Feed />} />
                    <Route path="/:profileName" element={<Profile />} />
                    <Route path="/Settings" element={<Settings />} />
                    <Route path="/Team" element={<Team />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />

                    {/* No match Route should always be at the bottom. */}
                    <Route path="*" element={<div>404 Page Not Found</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ChakraProvider>,
    root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
