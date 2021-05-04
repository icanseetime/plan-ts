import React from 'react';
import { Link } from "react-router-dom";

export default function NavGardener() {
    return (
        <ul className="iconUl mob">
            <Link to='/tasks' className="tasks liteicon"></Link>
            <Link to='/plants/overview' className="plantovw mainicon"></Link>
            <Link to='/profile' className="profile liteicon"></Link>
        </ul>
    )
}