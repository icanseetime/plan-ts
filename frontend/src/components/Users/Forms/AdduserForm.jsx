import React, { useState } from 'react';
import './Forms.css'

//import Email from './Inputs/Email'
//import Role from './Inputs/Role'

//fecth data with API https://dev.to/sanderdebr/creating-a-crud-app-in-react-with-hooks-3jml

export default function AdduserForm(props) {
    const initilizeUser = {
        _id: null,
        name: {
            first: '',
            last: ''
        },
        email: '',
        role: '',
        password: ''
    } //må være i samme rekkefølge som i userTable
    const [user, setUser] = useState(initilizeUser)
    const [error, setError] = useState('')

    //eksamen---
    // const [email, setEmail] = useState('');
    // onst [name, setName] = useState('')
    // const [role, setRole] = useState('');
    // const [password, setPassword] = useState('')


    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            await setUser({ ...user, [name]: value })
        }
        if (name === 'role') {
            await setUser({ ...user, [name]: value })
        }

        // Just in case, do not delete first and last below
        // if (name === 'first') {
        //     await setUser({ ...user, name: { ...user.name, 'first': value } })
        // }
        // if (name === 'last') {
        //     await setUser({ ...user, name: { ...user.name, 'last': value } }) har du kopiert user table? fordi må endre den for å pass herren sec
        // } 

    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.email && user.role) { //iksa man må ha onsubmit på form ikke knappen - trenger egentlig ikke å ha detre fordi require, men fint for bugs i guess :) user.name.first && user.name.last &&
            handleChange(e, props.addUser(user));
        } else {
            setError('You have to fill inn all the fields to add a new user')
        }

    }

    return (
        <div className="inputs">
            <form
                onSubmit={onSubmit}
            >
                {/* Just in case, do not delete first and last below */}
                {/* <label>First Name</label>
                <div className="inputcontainer">
                    <input
                        value={user.name.first}
                        onChange={handleChange}
                        placeholder="Jon"
                        type="text"
                        name="first"
                        required
                    />
                </div>

                <label>Last Name</label>
                <div className="inputcontainer">
                    <input
                        value={user.name.last}
                        onChange={handleChange}
                        placeholder="Doe" husk å kopier usertable å 
                        type="text"
                        name="last"
                        required
                    />
                </div> */}

                <label>Email</label>
                <div className="inputcontainer">
                    <input
                        placeholder="testUser@gmail.com"
                        type="email"
                        name="email"
                        required
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>

                <label> Role: </label>
                <div className="inputcontainer">
                    <select
                        value={user.role}
                        onChange={handleChange}
                        name="role"
                        required>
                        <option value="" disabled>--Choose a role--</option>
                        <option value="gardener">Gardener</option>
                        <option value="manager">Manager</option>
                    </select>

                </div>

                <button
                    type="submit"
                    className="btn"
                >Add user</button>

                <div className="error">
                    {/* Error msg */}
                    {error}
                </div>


            </form>

        </div>


    )
};