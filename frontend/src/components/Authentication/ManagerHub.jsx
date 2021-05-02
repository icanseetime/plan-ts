import React, { useContext } from 'react';
import { AuthContext } from '../../utils/context';
import {
  BrowserRouter as Router,//WARNING: Router blir ikke brukt?
  Link,
  Route,
  Switch,
  Redirect
}
  from "react-router-dom";

// Components
import NavManager from '../Nav/NavAlts/Manager';
import Landing from '../Landing/Landing';
import Tasks from '../Notifications/Notifications'; //endre
import Overview from '../Plants/OverviewPlants';
import Profile from '../Profile/ProfileHub';
import Help from '../TextComponent/Help';
import Settings from '../Settings/AllSettings';
import Feedback from '../Feedback/Feedback';
import Invites from '../Invites/InvitesOverview';
import Plant from '../Plants/Plant'
import FooterTxt from '../TextComponent/FooterTxt';

// Manager 
export default function ManagerHub() {
  const authContext = useContext(AuthContext);
  if (authContext.role === 'manager') {
    return authContext.isLoggedIn && (
      <div>
        <header className="App-header">
          {/* TODO move notifs here */}
          <nav>
            <Link id='logo' to='/'>
              <img
                src={`/src/../assets/logo.png`}
                alt="Plan-ts logo"
              />
            </Link>
            <NavManager />
            <Link className="i" to='/help'>
              <h3>i</h3>
            </Link>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path='/plants/overview'>
              <Overview />
            </Route>

            <Route path='/help'>
              <Help />
            </Route>

            <Route path='/plant'>
              <Plant />
            </Route>

            <Route path='/profile'>
              <Profile />
            </Route>

            <Route path='/tasks'>
              <Tasks />
            </Route>

            <Route path='/feedback'>
              <Feedback />
            </Route>

            <Route path='/settings'>
              <Settings />
            </Route>

            <Route path='/manageinvites'>
              <Invites />
            </Route>

            <Route exact path="/">
              <Landing />
            </Route>

            {/* Random urls will redirect user to landing */}
            <Route
              path="*"
              exact
              component={() => <Redirect to='/' />}
            />

          </Switch>
        </main >
        <footer>
          <FooterTxt />
        </footer>
      </div >

    );
  } else {
    return '';
  }
}