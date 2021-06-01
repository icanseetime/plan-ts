import React, { useContext, useState } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'

// Authentication
import { AuthContext } from '../../utils/context'

// CSS
import '../Nav/Nav.css'

// Components
import NavGuest from '../Nav/Guest'
import GardenerHub from './GardenerHub'
import ManagerHub from './ManagerHub'
import Login from '../Forms/Login'
import Landing from '../Landing/Landing'
import Overview from '../Plants/OverviewPlants'
import Register from '../Forms/Register'
import Help from '../TextComponent/Help'
import FooterTxt from '../TextComponent/FooterTxt'
import Plant from '../Plants/Plant'
import ResetPassword from '../Forms/ResetPassword'
import ForgotPassword from '../Forms/ForgotPassword'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

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
                    <nav>
                        <Link id="logo" to="/">
                            <img
                                src={`/src/../assets/logo.png`}
                                alt="Plan-ts logo"
                            />
                        </Link>
                        <NavGuest />
                        <div className="i">
                            <Link to='/help'>
                                <h3>i</h3>
                            </Link>
                        </div>
                    </nav>
                    <main>
                        <Switch>
                            <Route path="/register" component={Register} />
                            <Route path="/login">
                                <Login
                                    error={error}
                                    onSubmit={loginHandler}
                                    password={password}
                                    setPassword={(v) => { setPassword(v) }}
                                    setEmail={(v) => { setEmail(v) }}
                                    email={email}
                                />
                            </Route>
                            <Route path='/plantsoverview' component={Overview} exact />
                            <Route path="/resetPassword" component={ResetPassword} />
                            <Route path="/forgotpassword" component={ForgotPassword} exact />
                            <Route path='/plants/:_id' component={Plant} />
                            <Route path="/help" component={Help} />
                            <Route path="/" component={Landing} exact />
                            {/* Random urls will redirect user to landing */}
                            <Route path="*" component={() => <Redirect to="/" />} />
                        </Switch>
                    </main>
                    <footer>
                        <FooterTxt />
                    </footer>
                </div>
            )}

            {/* Gardener and manager pages start */}
            {authContext.isLoggedIn && (
                <>
                    <GardenerHub />
                    <ManagerHub />
                </>
            )}
        </div>
    )
}
