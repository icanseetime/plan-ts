import React, { useState, useEffect } from 'react';
import { ChangeTime } from '../../utils/functions.jsx';

export default function AllInvites(props) {
    const invites = props.invites;

    if (invites) {
        if (invites.length > 0) {
            return (
                invites.map((invite, index) => {
                    return (
                        <div className="letter" key={invite._id}>
                            <h3>Pending...</h3>
                            <div className="textField">
                                <p>Sent to: <strong>{invite.email}</strong></p>
                                <p>Role given: <strong>{invite.role.charAt(0).toUpperCase() + invite.role.slice(1)}</strong></p>
                                <hr />
                                <p>Invited by: <strong>{invite.invited_by.name.first} {invite.invited_by.name.last}</strong></p>
                                <p>Invite created: <strong>{ChangeTime(invite.createdAt)}</strong></p>
                            </div>
                            <div>
                                <button onClick={() => props.deleteInvite(invite._id)} className="delbtn delbtnMSG">Cancel Invite</button>
                            </div>
                        </div>
                    )
                })
            )
        } else { return <p>No Invites</p> }
    } else {
        return <p className="loading">Loading...</p>
    }
}




