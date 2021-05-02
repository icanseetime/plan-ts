import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
//import ManageUsers from './../ManageUsers';

// TODO: change 'crud' names into something else idk
import UsersOverview from '../Users/UsersOverview';
// import NewInvite from '../Invites/NewInvite';

import './Settings.css';

export default function AllSettingsManager() {
    return (
        <div className="Allsettings">
            <Switch>
                <Route exact path='/settings'>
                    <h1>Settings</h1>
                    <div className="settingsContainer">
                        <h2>Manage plants</h2>
                        <Link className="SettingsLink" to='/manageplants'>Manage plants</Link>
                    </div> <br /> <br />
                    <div className="settingsContainer">
                        <h2>Manage users</h2>
                        <Link className="SettingsLink" to='/manageinvites'>Manage invites</Link>
                        <Link className="SettingsLink" to='/settings/usersoverview'>Manage users</Link>
                    </div>
                </Route>
                <Route path='/settings/usersoverview/'>
                    <UsersOverview />
                </Route>

            </Switch>




        </div >
    )
}