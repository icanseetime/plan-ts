import React from 'react';
import { Link } from "react-router-dom";

import NavManager from './NavAlts/Manager';
import NavGardener from './NavAlts/Gardener';
import NavGuest from './NavAlts/Guest';

import './Nav.css';


export default function Nav(props) {
    let navType;

    switch (props.user) {
        case 'gardener':
            navType = <NavGardener />;
            break;
        case 'manager':
            navType = <NavManager />;
            break;
        default:
            navType = <NavGuest />;
    }

    return (
        <nav>
            <Link id='logo' to='/'>
                <img
                    src={`/src/../assets/logo.png`}
                    alt="Plan-ts logo"
                />
            </Link>
            {navType}
            <Link className="i" to='/help'>
                <h3>i</h3>
            </Link>
        </nav>
    )

}
