import React, { useState } from 'react';
import './Forms.css'

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
    }
    const [user, setUser] = useState(initilizeUser)
    const [error, setError] = useState('')

    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            await setUser({ ...user, [name]: value })
        }
        if (name === 'role') {
            await setUser({ ...user, [name]: value })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.email && user.role) {
            handleChange(e, props.addUser(user));
        } else {
            setError('You have to fill inn all the fields to add a new user')
        }

    }

    return (
        <div className="inputs">
            <form onSubmit={onSubmit}>
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
                    {error}
                </div>


            </form>

        </div>


    )
};