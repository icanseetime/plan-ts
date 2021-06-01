import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import './Forms.css';

import Password from './Inputs/Password';

export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [passRep, setPassRep] = useState('')
    const [resetInfo, setResetInfo] = useState({})
    const [error, setError] = useState('')
    const [iscorrect, setIscorrect] = useState(false);

    // Relocate
    const [willRelocate, setWillRelocate] = useState(false)

    const handleChange = (e, type) => {
        type || setPassword(e.target.value);
        type && setPassRep(e.target.value);
        type && (password === e.target.value ? setIscorrect(true) : setIscorrect(false));
        type || (passRep === e.target.value ? setIscorrect(true) : setIscorrect(false));
    }

    useEffect(() => {
        // Get request object id from url
        let reqObj_id = window.location.pathname;
        reqObj_id = reqObj_id.slice(15, 100);
        fetchResetInfo(reqObj_id);
    }, [])

    const fetchResetInfo = (reqObj_id) => {
        axios.get(`/api/users/forgotten-password/${reqObj_id}`)
            .then(res => {
                setResetInfo(res.data)
            })
            .catch(err => console.log('Error | ', err))
    }

    const ResetPassword = (e) => {
        e.preventDefault()
        let confirm = window.confirm('Reset password?');
        if(confirm === true) {
            let data = {
                'password': password
            };
            axios.put(`/api/users/${resetInfo.user_id}/password`, data)
            .then( res => {
                alert('Your password has been updated!')
                setWillRelocate(true)
            })
        }
    }

    if (willRelocate === true) return <Redirect to="/login" />
    return (
        <form onSubmit={(e) => ResetPassword(e) }>
            <h1>Reset Password</h1>
            <div className="preSet">
                <p>Enter your new password.</p>
            </div>
            <div className="inputs">
            <div className="singleInput">
                    <label> Password </label>
                    <div className="inputcontainer">
                        <input
                            value={password}
                            onChange={e => handleChange(e, false)}
                            placeholder="********"
                            type="password"
                            name="password"
                            required
                        />
                    </div></div>
                <div className="singleInput">
                    <label> Repeat Password </label>
                    <div className="inputcontainer">
                        <input
                            value={passRep}
                            onChange={(e) => handleChange(e, true)}
                            placeholder="********"
                            type="password"
                            name="passwordrepeat"
                            required
                        />
                    </div></div>
                <h4>Passwords {iscorrect ? 'match' : 'do not match'}.</h4>
                {error && (<h4 className="error">{error}</h4>)}
            </div>
            <button
                type="submit"
                disabled={!iscorrect}
                className={iscorrect ? "btn" : "btn inactive"}
            >Reset Password</button>
        </form>
    )
}