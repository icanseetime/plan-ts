import axios from 'axios'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import './Forms.css'

import Email from './Inputs/Email'

export default function ForgotPassword() {
    const [active, setActive] = useState(false)
    const [email, setEmail] = useState('')

    // Relocate
    const [willRelocate, setWillRelocate] = useState(false)

    // Regex for email validation
    const regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const validation = (e) => {
        let val = e.target.value
        if (regex.test(val)) {
            setActive(true)
            return true
        } else {
            setActive(false)
            return false
        }
    }

    // API Call || Send new password request (email)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (active) {
            let data = {
                email: email
            }
            axios
                .post(`/api/users/forgotten-password`, data)
                .then((res) => {
                    alert(
                        'Check your email and click the link to reset your password.'
                    )
                    setWillRelocate(true)
                })
                .catch((err) => {
                    console.log('Error | ', err)
                })
        }
    }

    if (willRelocate === true) return <Redirect to="/" />
    return (
        <form onChange={validation} onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
            <div className="preSet">
                <p>Enter your email</p>
            </div>
            <div className="inputs">
                <Email email={email} onChange={(value) => setEmail(value)} />
            </div>
            <button
                type="submit"
                disabled={!active}
                className={active ? 'btn' : 'btn inactive'}
            >
                Send reset request
            </button>
        </form>
    )
}
