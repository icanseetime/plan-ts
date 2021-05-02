import React from 'react';
import { Link } from "react-router-dom";

export default function NavGuest() {
    return (
        <ul className="iconUl mob">
            <Link to='/plants/overview' className="plantovw mainicon"></Link>
        </ul>
    )
}