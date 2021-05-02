import React, { useState, useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from '../../utils/context';

import './Forms.css';

import Email from './Inputs/Email'
import Password from './Inputs/Password'

export default function Login(props) {
  const authContext = useContext(AuthContext);

  //declaring states  
  const [repeatPass] = useState(false)
  const [active, setActive] = useState(false)

  const validation = () => {
    if (props.email.length > 0 && props.password.length > 0) {
      setActive({
        active: true
      })
    }
  }

  return (
    <>
      {!authContext.isLoggedIn && (
        <form
          onSubmit={(e) => { props.onSubmit(e) }}
          onChange={validation}
          className="loginForm"
        >
          <h1>Login</h1>
          <div className="inputs">
            <Email
              email={props.email}
              onChange={(value) => props.setEmail(value)}
            />

            <Password
              repeatPass={repeatPass}
              password={props.password}
              onChange={(value) => props.setPassword(value)}
            />
          </div>
          {/* Login error */}
          <div className="error">
            {props.error}
          </div>
          <button
            type="submit"
            disabled={!active}
            className={active ? "btn" : "btn inactive"}
          >Login
      </button>

          {/* Forgotten password link */}
          <div className="passLink">
            <Link to="/forgotpass">Forgot Password</Link>
          </div>



        </form>
      )}
      { authContext.isLoggedIn && (<Redirect to='/' />)}
      <div id="bg"></div>
    </>)



}
