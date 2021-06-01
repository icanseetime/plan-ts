import React, { useState, useEffect } from 'react'
import '../../Forms/Forms.css'

export default function EdituserForm(props) {
    const [user, setUser] = useState(props.currentUser)
    const [iscorrect, setIscorrect] = useState(false)

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    let pass
    let repPas

    const handleChange = async (e) => {
        const { name, value } = e.target
        if (name === 'email') {
            await setUser({ ...user, [name]: value })
        }
        if (name === 'role') {
            await setUser({ ...user, [name]: value })
        }
        if (name === 'first') {
            await setUser({ ...user, name: { ...user.name, first: value } })
        }
        if (name === 'last') {
            await setUser({ ...user, name: { ...user.name, last: value } })
        }
        if (name === 'password') {
            pass = value
        }
        if (name === 'passwordrepeat') {
            repPas = value
        }

        if (pass && repPas) {
            if (pass !== repPas || repPas !== pass) await setIscorrect(false)
            if (pass === repPas && repPas === pass) {
                await setIscorrect(true)
                await setUser({ ...user, password: pass })
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        props.updateUser(user._id, user)
    }

    return (
        <div className="inputs">
            <form onSubmit={onSubmit}>
                {props.firstname && (
                    <div className="singleInput">
                        <label>First Name</label>
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
                    </div>
                )}

                {props.lastname && (
                    <div className="singleInput">
                        <label>Last Name</label>
                        <div className="inputcontainer">
                            <input
                                value={user.name.last}
                                onChange={handleChange}
                                placeholder="Doe"
                                type="text"
                                name="last"
                                required
                            />
                        </div>
                    </div>
                )}

                {props.email && (
                    <div className="singleInput">
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
                    </div>
                )}

                {props.role && (
                    <div className="singleInput">
                        <label>
                            <span> Role</span>{' '}
                        </label>

                        <div className="inputcontainer">
                            <select
                                value={user.role}
                                onChange={handleChange}
                                name="role"
                                required
                            >
                                <option value="" disabled>
                                    -- Select a role --
                                </option>
                                <option value="gardener">Gardener</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>
                    </div>
                )}

                {props.password && (
                    <div>
                        <div className="singleInput">
                            <hr />
                            <p>
                                Leave password inputs empty if you do not want
                                to change your password.
                            </p>
                            <label> New Password </label>
                            <div className="inputcontainer">
                                <input
                                    onChange={(e) => handleChange(e, false)}
                                    placeholder="********"
                                    type="password"
                                    name="password"
                                />
                            </div>
                        </div>
                        <div className="singleInput">
                            <label> Repeat Password </label>

                            <div className="inputcontainer">
                                <input
                                    onChange={(e) => handleChange(e, true)}
                                    placeholder="********"
                                    type="password"
                                    name="passwordrepeat"
                                />
                            </div>
                        </div>
                        <h4>
                            Passwords {iscorrect ? 'match' : 'do not match'}.
                        </h4>
                    </div>
                )}
                <button type="submit" className="updatebtn">
                    Update
                </button>

                <button
                    onClick={() => props.setEditing(false)}
                    type="submit"
                    className="cancleFormbtn"
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}
