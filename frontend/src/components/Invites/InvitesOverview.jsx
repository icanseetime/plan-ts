import React, { useState, useEffect } from 'react';
import './Invites.css'
import AllInvites from './AllInvites';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import NewInvite from './NewInvite';
import axios from 'axios';

export default function Invites() {

    // For getting all invites
    const [invites, setInvites] = useState([])

    // For sending invites
    const [error, setError] = useState('') //TODO: fix error når mailen allerede e i bruk


    //GET TOKEN
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    // API call | Send a new invite
    const sendInvite = (em, r, senderId) => {
        const data = {
            'email': em,
            'role': r,
            'invited_by': senderId
        };

        axios.post('/api/users/invites', data, { headers })
            .then(res => {
                console.log('Status | ', res.status)
                alert(`User with email ${em} has been invited!`)
            })
            .catch( err => {
                setError('This email is already in the system.')
                console.log(error)
            })
    }

    // API call | Get all invitations
    const getInvites = async () => {
        await axios.get('/api/users/invites', { headers })
            .then(async res => {
                await setInvites(res.data)
                console.log(invites)
            })
            .catch(err => {
                console.log('Error | ', err)
            })
    }

    // API call | Delete an invite
    const deleteInvite = (invite_id) => {
        setInvites(invites.filter((invite) => invite._id !== invite_id))
        axios.delete(`/api/users/invites/${invite_id}`, { headers })
            .then(res => {
                console.log('User deleted')
            })
            .catch(err => {
                console.log('Error | ', err)
            })
    }

    useEffect(() => {
        getInvites();
    }, [])


        return (
            <div className="invites">
                <Switch>
                    <Route path='/manageinvites' exact>
                        <h1>Invites</h1>
                        <div className="buttons btnsContainerInv">
                            <Link to='/manageinvites/new'><button className="btn">Send a new invite</button></Link>
                            <Link to='/settings'><button className="btn">Back</button></Link>
                        </div>

                        {invites !== '' ? (
                        <div className="allInvitesContainer">
                            <AllInvites
                                invites={invites}
                                deleteInvite={deleteInvite}
                            />
                        </div>):(
                            <p className="loading">Loading invites...</p>
                        )}
                    </Route>
                    <Route path='/manageinvites/new' exact>
                        <NewInvite
                            sendInvite={sendInvite}
                            error={error}
                        />
                        <div className="backBtnContainer">
                            <Link to='/manageinvites'><button className="btn backBtn">Back</button></Link>
                        </div>
                    </Route>
                </Switch>
            </div>
        )

}
