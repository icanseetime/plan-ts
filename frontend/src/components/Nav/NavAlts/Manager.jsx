import React from 'react';
import { Link } from "react-router-dom";
import CountNotifs from '../../Notifications/CountNotifs';

export default function NavManager() {

 
    return (
        <ul className="iconUl mob">
            <div className="tasksNotifics">
            <Link to='/tasks' className="tasks liteicon"></Link>
            <CountNotifs />
            </div>            
            <Link to='/feedback' className="msgs liteicon"></Link>
            <Link to='/plants/overview' className="plantovw mainicon"></Link>
            <Link to='/profile' className="profile liteicon"></Link>
            <Link to='/settings' className="settings liteicon"></Link>
        </ul>
    )
}