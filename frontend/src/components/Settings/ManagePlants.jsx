import React from 'react';
import { Link } from "react-router-dom";

import './Settings.css';


//TODO: i figma e d lsm to settings menya så må vel få den linken om manage usert t å gå t herren:>
export default function ManageUsers() {
    return (
        <div className="Allsettings">
            <div className="settingsContainer">
                <h1>Manage plants (manager atm)</h1>
                    <Link className="SettingsLink" to='/newplant'>Add new plant</Link>
                    <Link className="SettingsLink" to='/updateplant'>Edit existing plants</Link>
            </div>
        </div>
    )
}