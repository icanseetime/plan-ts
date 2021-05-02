import axios from 'axios';
import React from 'react';
import { WaterSlider, FertSlider } from '../../utils/functions';
//calcDaysRemaining

// !! Componenet that gets all tasks that ARE DUE today, or are OVERDUE
export default function AllDueNotifications(props) {
    let fTasks = props.dueFertilizeNotifications;
    let wTasks = props.dueWaterNotifications;
    //console.log('ALL DUE TODAY NOTIF: ',wTasks);

    //GET TOKEN
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    const onClick = (plant_id, taskType) => {
        if (taskType === "water") {
            axios.put(`/api/plants/${plant_id}/water`, null, { headers })
                .then(res => {
                    alert('Plant has been watered!')
                })
                .catch(err => {
                    console.log('Error | ', err)
                })
        } else if (taskType === "fertilize") {
            axios.put(`/api/plants/${plant_id}/fertilize`, null, { headers })
                .then(res => {
                    alert('Plant has been fertilized!')
                })
                .catch(err => {
                    console.log('Error | ', err)
                })
        }
    }

    let wTasksList;
    if (wTasks.length > 0) {
        wTasksList = wTasks.map((task) => (
            <div className="oneTask" key={task._id}>
                <p>{task.name}</p>
                <button onClick={() => onClick(task._id, 'water')}>Complete task</button>
                {WaterSlider(task.health.water.amount)}
            </div>
        ))
    } else {
        return (
            <p className="dueTime" >No watering tasks at the moment</p>
        )
    }

    let fTasksList;
    if (fTasks.length > 0) {
        fTasksList = fTasks.map((task) => (
            <div className="oneTask" key={task._id}>
                <p>{task.name}</p>
                <button onClick={() => onClick(task._id, 'fertilize')}>Complete task</button>
                {FertSlider(task.health.fertilizer.amount)}
            </div>
        ))
    } else {
        return (
            <p className="dueTime">No fertilizing tasks at the moment</p>
        )
    }



    return (
        <div className="tasksContainer">
            <div>
                <h2>Watering tasks:</h2>
                {wTasksList}
            </div>
            <div>
                <h2>Fertilizing tasks:</h2>
                {fTasksList}
            </div>
        </div>
    )



}