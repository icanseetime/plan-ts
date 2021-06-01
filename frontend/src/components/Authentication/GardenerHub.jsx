import React, { useContext } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

// Authentication
import { AuthContext } from '../../utils/context'

// Components
import NavGardener from '../Nav/Gardener'
import Landing from '../Landing/Landing'
import Overview from '../Plants/OverviewPlants'
import Profile from '../Profile/ProfileHub'
import Help from '../TextComponent/Help'
import Tasks from '../Notifications/Notifications'
import FooterTxt from '../TextComponent/FooterTxt'
import CountNotifs from '../Notifications/CountNotifs'
import Plant from '../Plants/Plant'

export default function GardenerHub() {
    const authContext = useContext(AuthContext)
    if (authContext.role === 'gardener') {
        return (
            authContext.isLoggedIn && (
                <div>
                    <header className="App-header">
                        <nav>
                            <Link id="logo" to="/">
                                <img
                                    src={`/src/../assets/logo.png`}
                                    alt="Plan-ts logo"
                                />
                            </Link>
                            <NavGardener />
                            <div>
                                <div className="i">
                                    <Link to="/help">
                                        <h3>i</h3>
                                    </Link>
                                </div>
                                <button
                                    className="logoutNav"
                                    onClick={() => {
                                        authContext.logout()
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </nav>
                    </header>
                    <main>
                        <Switch>
                            <Route
                                path="/plantsoverview"
                                component={Overview}
                                exact
                            />
                            <Route path="/plants/:_id" component={Plant} />
                            <Route path="/help" component={Help} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/tasks" component={Tasks} />
                            <Route exact path="/" component={Landing} />

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
            )
        )
    } else {
        return ''
    }
}
