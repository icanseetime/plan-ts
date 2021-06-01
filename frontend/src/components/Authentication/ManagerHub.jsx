import React, { useContext } from 'react'
import { AuthContext } from '../../utils/context'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

// Components
import NavManager from '../Nav/Manager'
import Landing from '../Landing/Landing'
import Tasks from '../Notifications/Notifications'
import Overview from '../Plants/OverviewPlants'
import Profile from '../Profile/ProfileHub'
import Help from '../TextComponent/Help'
import Settings from '../Settings/AllSettings'
import Feedback from '../Feedback/Feedback'
import Invites from '../Invites/InvitesOverview'
import Plant from '../Plants/Plant'
import FooterTxt from '../TextComponent/FooterTxt'
import UsersOverview from '../Users/UsersOverview'
import AddPlant from '../Plants/Forms/AddPlant'
import EditPlant from '../Plants/Forms/EditPlant'

// Manager
export default function ManagerHub() {
    const authContext = useContext(AuthContext)
    if (authContext.role === 'manager') {
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
                            <NavManager />
                            <div className="iAndLogout">
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
                                path="/login"
                                component={() => <Redirect to="/" />}
                            />
                            <Route
                                path="/plantsoverview"
                                component={Overview}
                                exact
                            />
                            <Route path="/help" component={Help} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/tasks" component={Tasks} />
                            <Route path="/feedback" component={Feedback} />
                            <Route path="/settings" component={Settings} />
                            <Route path="/manageinvites" component={Invites} />
                            <Route
                                path="/usersoverview"
                                component={UsersOverview}
                            />
                            <Route
                                path="/plants/:_id"
                                component={Plant}
                                exact
                            />
                            <Route
                                path="/plantsnew"
                                component={AddPlant}
                                exact
                            />
                            <Route
                                path="/plantsedit/:_id"
                                component={EditPlant}
                                exact
                            />
                            <Route path="/" component={Landing} exact />

                            {/* Random urls will redirect user to landing */}
                            <Route
                                path="*"
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
