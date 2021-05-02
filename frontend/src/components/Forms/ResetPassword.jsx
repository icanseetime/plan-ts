import React, { useState } from 'react';

import './Forms.css';

import Password from './Inputs/Password';

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

export default function ResetPassword() {

    //declaring states
    const [active, setActive] = useState(false)
    const [password, setPassword] = useState('')

    const validation = () => {
        if ( password.length > 0) {
          setActive({
            active: true
          })
        }
    }


    return (
        <form onChange={validation}>
            <h1>Reset Password</h1>
            <div className="preSet">
                <p>Enter your new password.</p>
            </div>
            <div className="inputs">
                <Password
                    repeatPass={true}
                    password={password}
                    onChange={(value) => setPassword(value)}
                />
            </div>

            <button
        type="submit"
        disabled={!active} 
        className={active ? "btn" : "btn inactive"}
      >Reset Password
      </button>        </form>
    )
}