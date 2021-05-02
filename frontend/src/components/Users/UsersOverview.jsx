import React, { useState, useEffect } from 'react';
import EdituserForm from './Forms/EdituserForm';
import UsersTable from './UsersTable';
import axios from 'axios';
import './UserOverview.css';

export default function UsersOverview() {

  const [users, setUsers] = useState('');
  const [editing, setEditing] = useState(false);
  const initilizeUser = { _id: null, firstName: '', lastName: '', email: '', role: '' }
  const [currentUser, setCurrentUser] = useState(initilizeUser)

  //GET TOKEN
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` }


  // API call | Get all users
  useEffect(() => {
    const getUsers = async () => {
      await axios.get(`/api/users`, { headers })
        .then(res => {
          //console.log(res.data)
          setUsers(res.data);
        })
        .catch(err => {
          console.log('Error | ', err)
        })
    }
    getUsers();
  }, []);



  //add
  //const addUser = (testuser) => {
  // testuser._id = testusers.length + 1 //den e bare o du ikke bruke api i think idk
  // setTestusers([...testusers, testuser])
  //}

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
    console.log('DATA/BODY: ', data)

    await axios.put(`/api/users/${_id}/role`, data, { headers })
      .then(response => {
        console.log("Status: ", response.status);
        console.log("Data: ", response.data);

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
        console.log(`:D`)
      })
      .catch(err => {
        console.log('Error | ', err)
      })

    setUsers(users.filter((user) => user._id !== _id))

  }

  return (
    <div className="crudstuff">

      <h1>Manage Users</h1>
      <div className="bigcontainer">


        {editing ? (<div className="editoradd">
          <div className="smalcontainer">
            <h2>Update user</h2>
            <p>{currentUser.name.first} {currentUser.name.last}</p>
            <EdituserForm role={true} setEditing={setEditing} currentUser={currentUser} updateUser={updateUser}
            />
          </div>          </div>

        ) : (

          <div className="smalcontainer">
            <h2>All users</h2>
            <UsersTable users={users} deleteUser={deleteUser} editUser={editUser} />
          </div>
        )}

      </div>
    </div>


  )
}