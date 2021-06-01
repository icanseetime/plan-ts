import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import EditUser from './Forms/EditUser';
import UsersTable from './UsersTable';

import './UserOverview.css';

export default function UsersOverview() {
  const initilizeUser = { _id: null, firstName: '', lastName: '', email: '', role: '' }
  const [currentUser, setCurrentUser] = useState(initilizeUser)

  const [users, setUsers] = useState('');
  const [editing, setEditing] = useState(false);

  //GET TOKEN
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` }

  // API call | Get all users
  useEffect(() => {
    const getUsers = async () => {
      await axios.get(`/api/users`, { headers })
        .then(res => {
          setUsers(res.data);
        })
        .catch(err => {
          console.log('Error | ', err)
        })
    }
    getUsers();
  }, []);

  //edit & update
  const editUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  }

  //API CALL | update users
  const updateUser = async (_id, updateUser) => {
    setEditing(false);

    let data = {
      "role": updateUser.role,
    }

    await axios.put(`/api/users/${_id}/role`, data, { headers })
      .then(response => {
        setUsers(users.map((user) => (user._id === currentUser._id ? updateUser : user)))
      })
      .catch(err => {
        console.log('error! ', err)
      })
  }

  //API CALL | delete

  // TODO | ALL DELETE -> add 'are you sure'
  const deleteUser = async (_id) => {
    setEditing(false)
    await axios.delete(`/api/users/${_id}/manage`, { headers })
      .then(res => {
        alert('user deleted')
      })
      .catch(err => {
        console.log('Error | ', err)
      })
    setUsers(users.filter((user) => user._id !== _id))
  }
  return (
    <div>
      <h1>Manage Users</h1>
      {editing ? (
        <div id="users">
          <h2>Update user</h2>
          <div>
            <p>{currentUser.name.first} {currentUser.name.last}</p>
          </div>
          <EditUser
            role={true}
            setEditing={setEditing}
            currentUser={currentUser}
            updateUser={updateUser}
          />
        </div>
      ) : (
        <div id="users">
          <h2>All users</h2>
          <UsersTable users={users} deleteUser={deleteUser} editUser={editUser} />
          <Link to='/settings'><button className="btn">Back</button></Link>
        </div>
      )}
    </div>
  )
}