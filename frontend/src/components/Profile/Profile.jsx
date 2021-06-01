import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/context.js';
import { ChangeTime } from '../../utils/functions.jsx';
import './Profile.css'

export default function Profile(props) {
    const authContext = useContext(AuthContext);
    const profile = props.yourProfile

    const handleLogout = () => {
        authContext.logout();
        window.location.replace('/');
    }

    return profile ? (
        <div className="profileCard" key={profile.id}>
            <div className="profileInfo">
                <p>
                    <span>Name:</span> {profile.name.first} {profile.name.last}
                </p>
                <p>
                    <span>Email:</span> {profile.email}
                </p>
                <p>
                    <span>Role:</span> {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </p>
                <p>
                    <span>Created at:</span> {ChangeTime(profile.createdAt)}
                </p>
            </div>
            <button onClick={() => props.editUser(profile)} className="editbtn"> Edit </button>
            <Link to="/"><button onClick={() => handleLogout() } className="btn logout">Logout</button></Link>
        </div>
    ) : (
        <p className="loading">Loading...</p>
    )
}

