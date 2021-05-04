import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
//import ManageUsers from './../ManageUsers';

import UsersOverview from '../Users/UsersOverview';
// import NewInvite from '../Invites/NewInvite';

import './Settings.css';

export default function AllSettingsManager() {
    return (
        <div className="Allsettings">
            <Switch>
                <Route path='/settings' exact>
                    <h1>Settings</h1>
                    {/* <div className="settingsContainer">
                        <h2>Manage plants</h2>
                        <Link className="SettingsLink" to='/manageplants'>Manage plants</Link>
                    </div> <br /> <br /> */}
                    <div className="settingsContainer">
                        <h2>Manage users</h2>
                        <Link to='/manageinvites'><button className="btn">Manage invites</button></Link>
                        <Link to='/settings/usersoverview'><button className="btn">Manage users</button></Link>
                    </div>
                </Route>
                <Route path='/settings/usersoverview/'>
                    <UsersOverview />
                </Route>

            </Switch>
        </div >
    )
}