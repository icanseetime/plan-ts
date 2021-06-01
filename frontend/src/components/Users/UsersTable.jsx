import React from 'react'
import './UserOverview.css'

const UsersTable = (props) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th className="tableEmail">Email</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.length > 0 ? (
                        props.users.map((user, index) => (
                            <tr key={user._id}>
                                <td>
                                    {user.role.charAt(0).toUpperCase() +
                                        user.role.slice(1)}
                                </td>
                                <td className="tableEmail">{user.email}</td>
                                <td>
                                    {user.name.first} {user.name.last}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            props.deleteUser(user._id)
                                        }
                                        className="btn dangerBtn"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => props.editUser(user)}
                                        className="btn"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable
