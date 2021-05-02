import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/context';
import axios from 'axios';
import EdituserForm from '../Users/Forms/EdituserForm';
import Profile from './Profile';

export default function ProfileHub() {
    const authContext = useContext(AuthContext);

    const [yourProfile, setYourProfile] = useState('')
    const [editing, setEditing] = useState(false);
    const initilizeUser = { _id: null, name: { first: '', last: '' }, email: '', role: '' }
    const [currentUser, setCurrentUser] = useState(initilizeUser)

    //GET TOKEN
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    // API call | Get own profile
    useEffect(() => {
        const getUser = async () => {
            await axios.get(`/api/users/${authContext.userid}`, { headers })
                .then(res => {
                    setYourProfile(res.data)
                })
                .catch(err => {
                    console.log('Error | ', err)
                })
        }
        getUser();
    }, []);


    // Switch to form, for updating own profile 
    const editUser = (profile) => {
        setEditing(true);
        setCurrentUser(profile);
    }

    // API call | Update own profile
    const updateUser = async (_id, updateUser) => {
        setEditing(false);
        let data = {
            "email": updateUser.email,
            "name.first": updateUser.name.first,
            "name.last": updateUser.name.last
        }
        if (updateUser.password) {
            data = { ...data, "password": updateUser.password }
        }
        await axios.put(`/api/users/${authContext.userid}`, data, { headers })
            .then(response => {
                console.log("Status: ", response.status);
                console.log("Data: ", response.data);
                setYourProfile(updateUser) // No need to reload page to view change
            })
            .catch(err => {
                console.log('error! ', err)
            })
    }

    return (
        <div id="profileContainer">
            <h1>Profile</h1>
            {!editing ? (
                <div>
                    <Profile
                        yourProfile={yourProfile}
                        editUser={editUser}
                    />
                </div>
            ) : (
                <div className="smalcontainer">
                    <EdituserForm
                        password={true}
                        email={true}
                        firstname={true}
                        lastname={true}
                        role={false}
                        setEditing={setEditing}
                        currentUser={currentUser}
                        updateUser={updateUser}
                    />
                </div>
            )}
        </div>
    )
}



