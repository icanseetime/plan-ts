import React, { useState } from 'react'

import './Forms.css'
import Email from '../../Forms/Inputs/Email'

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    return (
        <form>
            <h1>Forgot Password</h1>
            <div className="preSet">
                <p>
                    Enter your email, and you will be send a link to reset your
                    password.
                </p>
            </div>
            <div className="inputs">
                <Email email={email} onChange={(value) => setEmail(value)} />
            </div>
            <button 
                type="submit" 
                className="btn"
            >
                Send
            </button>
        </form>
    )
}
