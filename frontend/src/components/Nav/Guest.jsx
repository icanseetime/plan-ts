import React from 'react'
import { Link } from 'react-router-dom'

export default function NavGuest() {
    return (
        <ul className="iconUl mob">
            <div className="plantovw mainicon">
                <Link
                    to="/plantsoverview"
                    title="Hyperlink to plants overview"
                ></Link>
            </div>
        </ul>
    )
}
