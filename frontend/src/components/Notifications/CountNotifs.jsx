import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

// CSS
import './Notifications.css'

// Authentication
import { AuthContext } from '../../utils/context';

export default function CountNotifs() {
    const [count, setCount] = useState() //TODO FIX MEMORY LEAK WARNINGEN
    const authContext = useContext(AuthContext)

    //GET TOKEN
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    const getNotificationCount = () => {
        axios.get(`/api/plants/notifications/count`, { headers })
            .then(res => {
                setCount(res.data.count)
            })
            .catch(err => console.log('Error | ', err))
    }

    const history = useHistory()

    useEffect(() => {
        return history.listen(() => {
            getNotificationCount();
        })
    }, [history])

    useEffect(() => {
        getNotificationCount();
    }, [])

    if (count !== '' && count) {
        return <p className={authContext.role === 'manager'?("notifCount"):("garnotifCount")}>{count}</p>
    } else {
        return <p className={authContext.role === 'manager'?("notifCount"):("garnotifCount")}>0</p>
    }
}