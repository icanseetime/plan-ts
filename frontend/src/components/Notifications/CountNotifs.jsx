import React, { useEffect, useState } from 'react';
import axios from 'axios'

import './Notifications.css'
import { useHistory } from 'react-router-dom';

export default function CountNotifs() {
    const [count, setCount] = useState() //TODO FIX MEMORY LEAK WARNINGEN

    //GET TOKEN
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    const getNotificationCount = () => {
        axios.get(`/api/plants/notifications/count`, { headers })
            .then(res => {
                // console.log(res.data)
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

    if (count !== '') {
        return <p className="notifCount">{count}</p>
    } else {
        return <p className="notifCount">X</p>
    }
}