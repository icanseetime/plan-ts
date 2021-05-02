import React from 'react';
import './UserOverview.css';


const UsersTable = (props) => {

  // const users = props.users;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            {/* <th>Lastname</th> */}
            <th>Email</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {/* TODO: fix: Warning: Each child in a list should have a unique "key" prop. Må kanskje fjern index fra map */}
          {props.users.length > 0 ? (
            props.users.map((user, index) =>
              <tr key={user._id}>
                <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                <td>{user.email}</td>
                <td>{user.name.first} {user.name.last}</td>
                <td>
                  <button onClick={() => props.editUser(user)} className="editbtn">Edit</button>
                  <button onClick={() => props.deleteUser(user._id)} className="delbtn">Delete</button>
                </td>
              </tr>
            )) : (
            <tr><td>NO USERS</td></tr> 
          )}
        </tbody>

      </table>

      {/* Backup :):))) :   D  It be doing a work yayu :o 
            oo d ser bra ut jo!
            <p>Name</p> Ska vi bare følg resten av den guiden da? :P Yeeeeees
            <p>Email</p>  Hell yes : D bakgrunnen på tabel va litt stygg haha xDD Ikik, er bare temp, og borders kan blir gray eller noe.
            <p>Role</p>

            {props.testusers.length > 0 ?(
            props.testusers.map((testuser) =>
<div className="singleuser">
                <li key={testuser.id}>
                    email: {testuser.email},
                    name: {testuser.name},
                    role: {testuser.role}
                </li>            
                <button>Edit</button>
            <button>Delete</button></div>
            )) : ( <p>NO USER</p>)}
*/}
    </div>
  )
}




export default UsersTable;