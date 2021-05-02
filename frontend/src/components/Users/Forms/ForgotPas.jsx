import React, { useState } from 'react';

import './Forms.css';
import Email from '../../Forms/Inputs/Email'


/*
TODO

- Hover text on disabled btn
- Only disabled when no text in inputs
- JWT connect to check who user is (Ida help)

Lørdag:
- Landing
- Hel(l)p
- About
register mayb?

*/


export default function ForgotPassword() {

    //declaring states
    //const [active, setActive] = useState(false)
    const [email, setEmail] = useState('');


    return (
        <form>
            <h1>Forgot Password</h1>
            <div className="preSet">
                <p>Enter your email, and you will be send a link to reset your password.</p>
            </div>
            <div className="inputs">
            <Email 
                    email={email} 
                    onChange={(value) => setEmail(value)} 
                />
            </div>

            <button 
                type="submit" 
                //disabled={!active} 
                className="btn"
                >Send
            </button>
        </form>
    )
}