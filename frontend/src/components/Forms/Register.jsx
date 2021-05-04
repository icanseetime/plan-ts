import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './Forms.css';

export default function Register(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [passRep, setPassRep] = useState('')
    const [invInfo, setInvInfo] = useState({})

    const [error, setError] = useState('')
    const [iscorrect, setIscorrect] = useState(props.repeatPass ? false : true);

    const handleChange = (e, type) => {
        type || setPassword(e.target.value);
        type && setPassRep(e.target.value);
        type && (password === e.target.value ? setIscorrect(true) : setIscorrect(false));
        type || (passRep === e.target.value ? setIscorrect(true) : setIscorrect(false));
    }

    const validation = () => {
        if (firstName.length > 1 && lastName.length > 1 && password.length > 2 && iscorrect) return true;
        else return false;
    }

    useEffect(() => {
        // Get request object id from url
        let reqObj_id = window.location.pathname;
        reqObj_id = reqObj_id.slice(10, 100);
        fetchInviteInfo(reqObj_id);
    }, [])

    const fetchInviteInfo = (reqObj_id) => {
        axios.get(`/api/users/invites/${reqObj_id}`)
            .then(res => setInvInfo(res.data))
            .catch(err => console.log('Error | ', err))
    }

    const registerUser = (e) => {
        e.preventDefault();
        if (validation() === true) {
            setError('')
            let data = {
                "email": invInfo.email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "role": invInfo.role
            }
            axios.post(`/api/users`, data)
            .then( res => {
                console.log('Successfully registered.')
                return window.location.replace('/')
            })
            .catch( err => console.log('Error | ', err))
        } else setError('Something went wrong')
    }

    return (
        <form onSubmit={(e) => registerUser(e)} >
            <h1>Register</h1>
            <div className="preSet">
                {invInfo ? (
                    <div>
                        <p>Email: <span>{invInfo.email}</span></p>
                        <p>Role: <span>{invInfo.role}</span></p>
                    </div>
                ) : (<p className="loading">Loading...</p>)}
            </div>

            <div className="inputs">
            <div className="singleInput">
                <label htmlFor="fname">First name</label>
                <div className="inputcontainer">
                    <input
                        required
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        id="fname"
                    />
                </div> 
                </div>
            <div className="singleInput">

                <label htmlFor="lname">Last name</label>
                <div className="inputcontainer">
                    <input
                        required
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        id="lname"
                    />
                </div>
                </div>
                
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
                className="btn"
            >Register</button>
        </form>
    )
}