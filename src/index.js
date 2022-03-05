import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* main Element */
import App from './App';

/* Route Elements */
import About from './routes/about';
import Login from './routes/login';
import Home from './routes/home';

/*  Logging etc  */
import reportWebVitals from './reportWebVitals';

import './index.css'

const root = document.getElementById('root');
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />

                {/* No match Route should always be at the bottom. */}
                <Route path="*" element={<div>404 Page Not Found</div>} />
            </Route>
        </Routes>
    </BrowserRouter>,
    root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
