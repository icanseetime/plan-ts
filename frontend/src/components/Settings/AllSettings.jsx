import React from 'react';
import { Link } from "react-router-dom";

import './Settings.css';

export default function AllSettingsManager() {
    return (
        <div>
            <h1>Settings</h1>
            <div className="settingsContainer">
                <h2>Manage users</h2>
                <Link to='/manageinvites'><button className="btn">Manage invites</button></Link>
                <Link to='/usersoverview'><button className="btn">Manage users</button></Link>
            </div>
        </div >
    )
}