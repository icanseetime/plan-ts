import React from 'react';
import { Link } from "react-router-dom";

import './Settings.css';


//TODO: i figma e d lsm to settings menya så må vel få den linken om manage usert t å gå t herren:>
export default function ManageUsers() {
    return (
        <div className="Allsettings">
            <div className="settingsContainer">
                <h1>Manage users (manager atm)</h1>
                    <Link className="SettingsLink" to='/invite'>Invite new user</Link>
                    <Link className="SettingsLink" to='/manageinvites'>Manage invites</Link>
                    <Link className="SettingsLink" to='/editusers'>Edit existing users</Link>
                    <Link className="SettingsLink" to='/viewuser'>View existing users</Link>
            </div>
        </div>
    )
}