import './App.css' // Main css
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// http://192.168.0.111:3000/

//comps
import Nav from './components/Nav/Nav';
import Login from './components/Forms/Login';
import Help from './components/TextComponent/Help';
import Landing from './components/Landing/Landing';
import Register from './components/Forms/Register';
import ForgotPassword from './components/Forms/ForgotPas';
import ResetPassword from './components/Forms/ResetPassword';
import AllSettings from './components/UserSettings/AllSettings';
import ManageUsers from './components/UserSettings/ManageUsers';
import ManagePlants from './components/UserSettings/ManagePlants';
import UsersOverview from './components/Users/CRUDtest/UsersOverview';
import PlantOverview from './components/Plants/Overview';
import Plant from './components/Plants/LitePlant';
import Messages from './components/Message/Messages';


// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { decodeJWT } from './utils/decodeJWT';
import axios from 'axios';

library.add(fas, far);

const App = () => { 

  // Determine what type of user upon login. Default will be 'Guest'
  const [user, setUser] = useState('guest');

  const handleAuth = (token) => {
    const tokendata = decodeJWT(token);
    console.log('token ', tokendata);

    setUser(tokendata.user.role)
    
  }

  // div ideas
  // https://stackoverflow.com/questions/60595658/how-to-implement-multi-role-based-authorization-in-react nav bar auth greier
  // https://medium.com/@umairkz52/role-based-authorization-role-based-access-control-in-react-js-65c05a372ca8 mer om routes

  //auth fra oblig 2 idk
  // const [isAuth, setIsAuth] = useState(false)  uffff hate å ikke skjønn en drit l

  // const OnAuthChange = (e) => { sec
  //   setIsAuth({ i localstorage betyr det, noe vi har gjort kind of, om det fortsat funker tfff hvor ellers??? uuuh oki ja trur han store d i local storage. tru contex greia e nå m routes ås hit for auth
  //     isAuth: e Yee virker som det er mest for å unngå å passe en state/prop igjennom mange components. Vi trenger det ikke, tror jeg haha
  //   })                                                                https://reactjs.org/docs/context.html#when-to-use-context   
  // }  han store jwt tokenen i "memory" i powepointen ka nå enn d betyr hmm står lsm ikke nå localstorage i koden hannes, han bruke nå rarert CONTEXT e en react greie men idk ass  || Mye greier i on-campus-tracker.zip :thonk: yee
  //se på d? :P

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Nav user={user} />
        </header>

        <main>
          <Switch>
            <Route 
              path="/" 
              exact
              render={(props)=>(
                <Landing {...props} user={user} token={(value) => handleAuth(value)} />
              )}
            />
            
            <Route 
              path="/login"
              render={(props)=>(
              <Login {...props} 
                user={user} 
                token={(value) => handleAuth(value)} />
              )}
            />
            
            <Route 
              path="/register"
              render={()=>(
              <Register />
              )}
            />
            
            <Route 
              path="/forgotpass"
              render={()=>(
              <ForgotPassword />
              )}
            />
            
            <Route 
              path="/resetpass"
                render={() => (
              <ResetPassword />
              )}
            />
            <Route 
              path="/help"
              render={()=>(
              <Help />
              )}
            />

            <Route path="/plants/overview"
              render={() => (
              <PlantOverview />
              )}
            />

            <Route 
              path="/settings"
              render={(props)=> (
              <AllSettings {...props} user={user} />
                )}
            />

            {/* de under skal vel ikke være på denne siden, bare for test */}
            <Route 
              path="/manageusers"
              render={()=> (
                <ManageUsers/>
                )} /> 

            <Route
              path="/manageplants"
              render={() => (
                <ManagePlants />
              )}
            />

            <Route 
              path="/usersoverview"
              render={() => (
                 <UsersOverview />
              )} 
            />
             

            {/* <Route path="/liteplant">
              <LitePlant />
            </Route> */}

            <Route path="/plantoverview"
              render={() => (
              <Plant />
              )} />

            <Route path="/feedback"
            render={() => (
              <Messages />
              )} />
            
            {/* Random urls will redirect user to landing */}
            <Route 
              path="*"
              component={() => <Redirect path='/' />}
            />

          </Switch>
        </main>
      </Router>
    </div >
  )



}

export default App;
