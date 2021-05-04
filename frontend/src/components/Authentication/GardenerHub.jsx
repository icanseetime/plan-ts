import React, { useContext } from 'react';
import { AuthContext } from '../../utils/context';
import {
  BrowserRouter as Router, //WARNING: router aldri brukt
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// Components
import NavGardener from '../Nav/Gardener';
import Landing from '../Landing/Landing';
import Overview from '../Plants/OverviewPlants';
import Profile from '../Profile/ProfileHub';
import Help from '../TextComponent/Help'
import Tasks from '../Notifications/Notifications';
import FooterTxt from '../TextComponent/FooterTxt';
import CountNotifs from '../Notifications/CountNotifs';

export default function GardenerHub() {
  const authContext = useContext(AuthContext);
  if (authContext.role === 'gardener') {
    return authContext.isLoggedIn && (

      <div>
        <header className="App-header">
          <nav>
            <Link id='logo' to='/'>
              <img
                src={`/src/../assets/logo.png`}
                alt="Plan-ts logo"
              />
            </Link>
            <CountNotifs />
            <NavGardener />
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

            <Route path='/profile'>
              <Profile />
            </Route>

            <Route path='/tasks'>
              <Tasks />
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
        </main>
        <footer>
          <FooterTxt />
        </footer>
      </div >

    );
  } else {
    return '';
  }
}