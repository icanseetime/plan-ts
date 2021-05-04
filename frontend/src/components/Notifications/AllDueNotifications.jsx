import axios from 'axios';
import React from 'react';
import { WaterSlider, FertSlider } from '../../utils/functions';
//calcDaysRemaining

// !! Componenet that gets all tasks that ARE DUE today, or are OVERDUE
export default function AllDueNotifications(props) {
    let fTasks = props.dueFertilizeNotifications;
    let wTasks = props.dueWaterNotifications;

    //GET TOKEN
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    const completeTask = (plant_id, taskType) => {
        if (taskType === "water") {
            axios.put(`/api/plants/${plant_id}/water`, null, { headers })
                .then(res => {
                    alert('Plant has been watered!')
                    props.reload();
                })
                .catch(err => {
                    console.log('Error | ', err)
                })
        } else if (taskType === "fertilize") {
            axios.put(`/api/plants/${plant_id}/fertilize`, null, { headers })
                .then(res => {
                    alert('Plant has been fertilized!')
                    props.reload();
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
                <h4>{task.name}</h4>
                {WaterSlider(task.health.water.amount)}

                <button
                    className="btn"
                    onClick={() => completeTask(task._id, 'water')}
                >
                    Complete task
                </button>
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
                <h4>{task.name}</h4>
                {FertSlider(task.health.fertilizer.amount)}

                <button
                    className="btn"
                    onClick={() => completeTask(task._id, 'fertilize')}
                >
                    Complete task
                </button>
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
                <h3>Watering tasks</h3>
                {wTasksList}
            </div>
            <div>
                <h3>Fertilizing tasks</h3>
                {fTasksList}
            </div>
        </div>
    )



}