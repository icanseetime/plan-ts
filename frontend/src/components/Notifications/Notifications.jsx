import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllNotifications from './AllNotifications';
import AllDueNotifications from './AllDueNotifications';
//import { calcDaysRemaining } from '../../utils/functions';
import './Notifications.css';

export default function Notification() {

    const [notDueFertilizeNotifications, setNotDueFertilizeNotifications] = useState('')
    const [notDueWaterNotifications, setNotDueWaterNotifications] = useState('')

    const [dueFertilizeNotifications, setDueFertilizeNotifications] = useState('')
    const [dueWaterNotifications, setDueWaterNotifications] = useState('')

    //GET TOKEN 
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    useEffect(() => {
        getAllNotifications();
    }, [])

    // API Call | Get plants 
    const getAllNotifications = () => {
        // Get plants due in three or less days
        axios.get('/api/plants/notifications?days=3', { headers })
            .then( res => {
                let notifications =  res.data;
                //console.log(res.data);
                //console.log(" ! ", calcDaysRemaining(res.data.fertilize[0].health.fertilizer.due))
                setNotDueFertilizeNotifications(notifications.fertilize);
                setNotDueWaterNotifications(notifications.water)

                //console.log('Fertilize later | ', notifications.fertilize);
                //console.log('Water later | ', notifications.water)
            })
            .catch(err => console.log('Error! ', err))

            axios.get('/api/plants/notifications', { headers })
            .then( res => {
                let notifications =  res.data;
                //console.log(res.data);
                //console.log(" ! ", calcDaysRemaining(res.data.fertilize[0].health.fertilizer.due))
                setDueFertilizeNotifications(notifications.fertilize);
                setDueWaterNotifications(notifications.water)

                //console.log('Fertilize NOW | ', notifications.fertilize);
                //console.log('Water NOW | ', notifications.water)
            })
            .catch(err => console.log('Error! ', err))
    };

    if(dueFertilizeNotifications !== '' && notDueFertilizeNotifications !== ''){
    return (
        <div id="allTasks">
            <h1>Tasks</h1>
            <p id="tasksHowTo">When you are done with your task, click the corresponding button to update the plant status.</p>
            
            <h2 className="dueTime">Due today</h2>
            <AllDueNotifications 
                 dueFertilizeNotifications={dueFertilizeNotifications}
                 dueWaterNotifications={dueWaterNotifications}
            /> 
            <h2 className="dueTime">Due in a few days</h2>
            <AllNotifications 
                 notDueFertilizeNotifications={notDueFertilizeNotifications}
                 notDueWaterNotifications={notDueWaterNotifications}
            /> 
        </div>
    );} else {
        return <p className="loading">Loading...</p>
    }
}