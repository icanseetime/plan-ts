import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from "../../utils/context";
import './Landing.css';
import About from '../TextComponent/About';

export default function Landing() {
    const authContext = useContext(AuthContext);

    // const [user, setUser] = useState() //WARNING: src\components\Landing\Landing.jsx
    // //Line 13: 12: 'user' is assigned a value but never - kanskje d som skape login error greia? no idea lol
    // useEffect(() => {
    //     const config = {
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //     }
    //     // API Call || Login user
    //     axios.get('/api/users/login', config)
    //         .then(
    //             res => {
    //                 setUser(res.data)
    //             },
    //             err => {
    //                 console.log(err)
    //             }
    //         )
    // }, [])

    let button;
    if (!authContext.isLoggedIn) {
        button = <Link to="/login"><button className="btn loginbtn">Login</button></Link>;
    } else {
        button = <Link to="/"><button onClick={() => { authContext.logout() }} className="btn logoutbtn">Logout</button></Link>
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
    );
}