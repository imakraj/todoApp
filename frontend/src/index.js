import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const Context = createContext({ isAuthenticated: false });

const AuthContext = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Context.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            isLoggedIn,
            setIsLoggedIn
        }}>
            <App />
        </Context.Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContext />
);