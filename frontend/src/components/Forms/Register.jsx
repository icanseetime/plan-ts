import React, { useState } from 'react';


import './Forms.css';
import Name from './Inputs/Name'
import Password from './Inputs/Password'


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


export default function Register() {

    //declaring states
    const [active, setActive] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmRepeat, setConfirmRepeat] = useState(false)

    //api call add new user api/users(post)

    const validation = () => { //Den her funker nå -ish
      console.log(confirmRepeat)
      if (confirmRepeat === true && name.length > 0 && password.length > 0) {
        setActive({
          active: true
        })
      }
    }

    return (
        <form onSubmit={(e) => {e.preventDefault()}} onChange={validation}>
            <h1>Register</h1>
            <div className="preSet">
                <p>Email: Some email</p>
                <p>Role: Some role</p>
            </div>
            <div className="inputs">


                <Name
                    name={name}
                    onChange={(value) => setName(value)}
                />

                <Password
                    repeatPass={true}
                    password={password}
                    onChange={(value) => setPassword(value)}
                    confirmRepeat={(value) => setConfirmRepeat(value)}
                />
            </div>
            <button 
                type="submit" 
                disabled={!active} 
                className={active ? "btn" : "btn inactive"}
            >Register</button>
        </form>
    )
}