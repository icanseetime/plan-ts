import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    plantid: '',
    userid: '',
    role: 'guest',
    login: () => { },
    logout: () => { }
});