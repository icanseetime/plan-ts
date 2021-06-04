import React from 'react'
import { Link } from 'react-router-dom'
import CountNotifs from '../Notifications/CountNotifs'

export default function NavManager() {
    return (
        <ul className="mob">
            <div className="tasks liteicon">
                <Link to="/tasks" title="Hyperlink to tasks"></Link>
                <CountNotifs />
            </div>
            <div className="msgs liteicon">
                <Link to="/feedback" title="Hyperlink to messages"></Link>
            </div>
            <div className="plantovw mainicon">
                <Link
                    to="/plantsoverview"
                    title="Hyperlink to plants overview"
                ></Link>
            </div>
            <div className="profile liteicon">
                <Link to="/profile" title="Hyperlink to your profile"></Link>
            </div>
            <div className="settings liteicon">
                <Link to="/settings" title="Hyperlink to settings"></Link>
            </div>
        </ul>
    )
}
