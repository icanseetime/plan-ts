import React from 'react';
import { ChangeTime } from '../../utils/functions.jsx';
import './Profile.css'

export default function Profile(props) {
    const profile = props.yourProfile

    return (profile ? (
        <div className='profileCard' key={profile.id}>
            <div className="profileInfo">
                <p><span>Name:</span> {profile.name.first} {profile.name.last}</p>
                <p><span>Email:</span> {profile.email} </p>
                <p><span>Role:</span> {profile.role} </p>
                <p><span>created at:</span> {ChangeTime(profile.createdAt)}</p>
            </div>
            <button onClick={() => props.editUser(profile)} className="editbtn">Edit</button>
        </div>
    ) : (
        <h3 id="noProfile">PROFILE NOT FOUND</h3>
    ))
}

