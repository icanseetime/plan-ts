import React from 'react';
import { Link } from "react-router-dom";
import CountNotifs from '../Notifications/CountNotifs';

export default function NavGardener() {
    return (
        <ul className="mob">
            <div className="tasks liteicon">
                <Link to='/tasks' title="Hyperlink to tasks"></Link>
                <CountNotifs />
                </div>
            <div className="plantovw mainicon"><Link to='/plantsoverview'  title="Hyperlink to plants overview"></Link></div>
            <div className="profile liteicon"><Link to='/profile' title="Hyperlink to plants your profile"></Link></div>
        </ul>
    )
}