import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../utils/context'
import './Landing.css'
import About from '../TextComponent/About'

export default function Landing() {
    const authContext = useContext(AuthContext);

    let button;
    if (!authContext.isLoggedIn) {
        button = (
            <Link to="/login">
                <button className="btn loginbtn">Login</button>
            </Link>
        )
    } else {
        button = (
            <Link to="/">
                <button
                    onClick={() => {
                        authContext.logout()
                    }}
                    className="btn logoutbtn"
                >
                    Logout
                </button>
            </Link>
        )
    }

    return (
        <div className="container land">
            <div className="content">
                <div className="welcome">
                    <h1>Welcome to Plan-ts!</h1>
                    <About />
                    {button /* Login or logout depending on localstorage */}
                </div>
            </div>
            <div id="bg"></div>
        </div>
    )
}
