import React, { useEffect, useState } from 'react'
import './App.css'
import { AuthContext } from './utils/context'
import Authentication from './utils/authentication'
import ProtectedPage from './utils/guestHub'

export default function App() {
    const [token, setToken] = useState(null)
    const [tokenExpirationTime, setTokenExpirationTime] = useState()

    const login = (token, expirationTime) => {
        setToken(token)
        const expiration =
            expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60)

        setTokenExpirationTime(expiration) // Will expire one hour from creation

        localStorage.setItem(
            'userData',
            JSON.stringify({
                token,
                expirationTime: expiration.toISOString()
            })
        )
    }
    const logout = () => {
        setToken(null)
        setTokenExpirationTime(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expirationTime) > new Date()
        ) {
            login(storedData.token, new Date(storedData.expirationTime))
        }
    }, [login])

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: !!token, login: login, logout: logout }}
        >
            <Authentication />
            <ProtectedPage />
        </AuthContext.Provider>
    )
}
