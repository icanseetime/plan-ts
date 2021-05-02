import React, { useContext, useState } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { AuthContext } from '../../utils/context'

import axios from 'axios'
import '../Nav/Nav.css'

import NavGuest from '../Nav/NavAlts/Guest'
import GardenerHub from './GardenerHub'
import ManagerHub from './ManagerHub'
import Login from '../Forms/Login'
import Landing from '../Landing/Landing'
import Overview from '../Plants/OverviewPlants'
import Register from '../Forms/Register'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Help from '../TextComponent/Help'
import FooterTxt from '../TextComponent/FooterTxt'
library.add(fas)

//TODO: fikse auth på knappan så ikke guest users ser alt av info om water plant å shit, ska vel bare se loc, needs å feedback, fikse add plant(mangle picture å loc), invite system, notification system, sjekke i morra om planten kjell telle oppover på days left lol

export default function Authentication() {
    const authContext = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const loginHandler = (e) => {
        let data = {
            email: email,
            password: password
        }
        e.preventDefault()
        if (email && password) {
            axios
                .post('/api/users/login', data)
                .then((res) => {
                    localStorage.setItem('token', res.data.token)
                    authContext.login(res.data.token) // setAuthContext
                })
                .catch((error) => {
                    console.log('Error | ', error)
                    setError('Password or email is wrong')
                })
        } else {
            setError('Password or email is wrong')
        }
    }

    return (
        <div className="App">
            {/* Guest page / Not logged in page */}
            {!authContext.isLoggedIn && (
                <div>
                    <header>
                        <nav>
                            <Link id="logo" to="/">
                                <img
                                    src={`/src/../assets/logo.png`}
                                    alt="Plan-ts logo"
                                />
                            </Link>
                            <NavGuest />
                            <Link className="i" to="/help">
                                <h3>i</h3>
                            </Link>
                        </nav>
                    </header>
                    <main>
                        <Switch>
                            <Route path="/login">
                                <Login
                                    error={error}
                                    onSubmit={loginHandler}
                                    password={password}
                                    setPassword={(v) => {
                                        setPassword(v)
                                    }}
                                    setEmail={(v) => {
                                        setEmail(v)
                                    }}
                                    email={email}
                                    onChange={() =>
                                        console.log(`${email} | ${password}`)
                                    }
                                />
                            </Route>

                            <Route path="/plants/overview">
                                <Overview />
                            </Route>

                            <Route path="/help">
                                <Help />
                            </Route>

                            <Route path="/register">
                                <Register />
                            </Route>

                            <Route path="/">
                                <Landing />
                            </Route>
 
                            {/* Random urls will redirect user to landing */}
                            <Route
                                path="*"
                                exact
                                component={() => <Redirect to="/" />}
                            />
                        </Switch>
                    </main>
                    <footer>
                        <FooterTxt />
                    </footer>
                </div>
            )}

            {/* Gardener and manager pages start */}
            {authContext.isLoggedIn && (
                <div>
                    <GardenerHub />
                    <ManagerHub />
                </div>
            )}
        </div>
    )
}
