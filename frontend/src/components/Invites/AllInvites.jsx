import React, { useState, useEffect } from 'react';
import { ChangeTime} from '../../utils/functions.jsx';

export default function AllInvites(props) {
    const invites = props.invites;

    if (invites.length > 0) {
        return (
            invites.map((invite, index) => {
                return (
                    <div className="letter" key={invite._id}>
                        <h3 className="name">Pending...</h3>
                        <div className="textField">
                            <p>Sent to: {invite.email}</p>
                            <p>Role given: {invite.role}</p>
                            <hr />
                            <p>Invited by: {invite.invited_by.name.first} {invite.invited_by.name.last}</p>
                            <p>Invite created: {ChangeTime(invite.createdAt)}</p>
                        </div>
                        <div className="btnContainer">
                            <button onClick={() => props.deleteInvite(invite._id)} className="delbtn delbtnMSG">Delete</button>
                        </div>
                    </div>
                )
            })
            

            )
    } else { return <p>No Invites</p> }

}




