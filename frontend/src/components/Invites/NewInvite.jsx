import React, { useState, useContext  } from 'react';
import { AuthContext } from '../../utils/context';
import './Invites.css'

import Email from '../Forms/Inputs/Email';
import Role from '../Forms/Inputs/Role';

export default function NewInvite(props) {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const authContext = useContext(AuthContext);
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        await props.sendInvite(email, role, authContext.userid)
    };

    return (
        <div>
            <h1>Send new invite</h1>
            <form onSubmit={(e)=>handleSubmit(e)} >
                <div className="inputs">
                <Email
                    email={email}
                    onChange={(value) => setEmail(value)}
                />
                <Role
                    role={role}
                    onChange={(value) => setRole(value)}
                />
                </div>
                <p className="error">{props.error}</p>
                <button className="btn" type="submit">Send Invite</button>
            </form>
        </div>
    )
}
