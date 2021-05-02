import './App.css' // Main css
import React, { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { decodeJWT } from './utils/functions';
import { AuthContext } from "./utils/context";
import Authentication from "./components/Authentication/Authentication";



let logoutTimer;

const App = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();
  const [role, setRole] = useState('guest');
  const [userid, setUserid] = useState('');

  const login = useCallback((token, expirationTime) => {
    setToken(token);
    const expiration = expirationTime || new Date(new Date().getTime() + 24000 * 60 * 60); // 24 hours

    setTokenExpirationTime(expiration);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        token,
        expirationTime: expiration.toISOString()
      })
    )

    const tokendata = decodeJWT(token);
    setRole(tokendata.user.role)
    setUserid(tokendata.user._id)
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationTime(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expirationTime) > new Date()) {
      login(storedData.token, new Date(storedData.expirationTime));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationTime]);

  return (
    <div className="App">
        <AuthContext.Provider value={{ isLoggedIn: !!token, login: login, logout: logout, role: role, userid: userid }}>
          <Router>
            <Authentication />
          </Router>
        </ AuthContext.Provider >
    </div >
  )

    // Add forgot password AND register to App(or maybe authentication)

}

export default App;
