import React, { useState, useEffect } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'

// CSS
import './Invites.css'

// Components
import AllInvites from './AllInvites'
import NewInvite from './NewInvite'

export default function Invites() {
    const [invites, setInvites] = useState([])
    const [error, setError] = useState('')

    //GET TOKEN
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }

    // API call | Send a new invite
    const sendInvite = (em, r, senderId) => {
        let confirm = window.confirm(`Send invitation to ${em}?`)
        if (confirm === true) {
            const data = {
                email: em,
                role: r,
                invited_by: senderId
            }
            axios
                .post('/api/users/invites', data, { headers })
                .then((res) => {
                    alert(`User with email ${em} has been invited!`)
                })
                .catch((err) => {
                    setError('This email is already in the system.')
                    console.log(error)
                })
        }
    }

    // API call | Get all invitations
    const getInvites = async () => {
        await axios
            .get('/api/users/invites', { headers })
            .then(async (res) => {
                await setInvites(res.data)
            })
            .catch((err) => {
                console.log('Error | ', err)
            })
    }

    // API call | Delete an invite
    const deleteInvite = (invite_id) => {
        let confirm = window.confirm('Cancel invitation?')
        if (confirm === true) {
            setInvites(invites.filter((invite) => invite._id !== invite_id))
            axios
                .delete(`/api/users/invites/${invite_id}`, { headers })
                .then((res) => {
                    alert('Invite deleted')
                })
                .catch((err) => {
                    console.log('Error | ', err)
                })
        }
    }

    useEffect(() => {
        getInvites()
    }, [])
    
    return (
        <div>
            <Switch>
                <Route path="/manageinvites" exact>
                    <h1>Invites</h1>
                    <div className="btnsContainerInv">
                        <Link to="/manageinvites/new">
                            <button className="btn">Send a new invite</button>
                        </Link>
                        <Link to="/settings">
                            <button className="btn">Back</button>
                        </Link>
                    </div>

                    {invites !== '' ? (
                        <div className="allInvitesContainer">
                            <AllInvites
                                invites={invites}
                                deleteInvite={deleteInvite}
                            />
                        </div>
                    ) : (
                        <p className="loading">Loading invites...</p>
                    )}
                </Route>
                <Route path="/manageinvites/new" exact>
                    <NewInvite sendInvite={sendInvite} error={error} />
                    <div className="backBtnContainer">
                        <Link to="/manageinvites">
                            <button className="btn backBtn">Back</button>
                        </Link>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}
