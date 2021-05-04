import React from 'react';
import { Link } from "react-router-dom";
export default function NavManager() {
    return (
        <ul className="iconUl mob">
            <Link to='/tasks' className="tasks liteicon"></Link>
            <Link to='/feedback' className="msgs liteicon"></Link>
            <Link to='/plants/overview' className="plantovw mainicon"></Link>
            <Link to='/profile' className="profile liteicon"></Link>
            <Link to='/settings' className="settings liteicon"></Link>
        </ul>
    )
}