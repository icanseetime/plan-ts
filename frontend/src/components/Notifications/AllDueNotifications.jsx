import axios from 'axios'
import React, { useContext } from 'react'
import { AuthContext } from '../../utils/context'
import { WaterSlider, FertSlider } from '../../utils/functions'

// Componenet that gets all tasks that ARE DUE today, or are OVERDUE
export default function AllDueNotifications(props) {
    const authContext = useContext(AuthContext)

    // List of both types of tasks
    let fTasks = props.dueFertilizeNotifications
    let wTasks = props.dueWaterNotifications

    //GET TOKEN
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }

    const completeTask = (plant_id, taskType) => {
        let confirm = window.confirm('Please confirm completion')
        if (confirm === true) {
            let data = { user_id: authContext.userid } // To see who completed the task
            // Water tasks
            if (taskType === 'water') {
                axios
                    .put(`/api/plants/${plant_id}/water`, data, { headers })
                    .then((res) => {
                        //alert('Plant has been watered!')
                        props.reload()
                    })
                    .catch((err) => {
                        console.log('Error | ', err)
                    })
                // Fertilization tasks
            } else if (taskType === 'fertilize') {
                axios
                    .put(`/api/plants/${plant_id}/fertilize`, data, { headers })
                    .then((res) => {
                        //alert('Plant has been fertilized!')
                        props.reload()
                    })
                    .catch((err) => {
                        console.log('Error | ', err)
                    })
            }
        }
    }

    let wTasksList // Water tasks list
    if (wTasks.length > 0) {
        wTasksList = wTasks.map((task) => (
            <div className="oneTask" key={task._id}>
                <h3 className="taskName">{task.name}</h3>
                <div className="locInfo">
                    <h3>Location</h3>
                    <p>{task.location.building.name}</p>
                    <p>On floor {task.location.floor}</p>
                    <p>In room {task.location.room}</p>
                </div>
                {WaterSlider(task.health.water.amount)}
                <button
                    className="btn"
                    onClick={() => completeTask(task._id, 'water')}
                >
                    Complete task
                </button>
            </div>
        ))
    }

    let fTasksList // Fertilization tasks list
    if (fTasks.length > 0) {
        fTasksList = fTasks.map((task) => (
            <div className="oneTask" key={task._id}>
                <h3 className="taskName">{task.name}</h3>
                <div className="locInfo">
                    <h3>Location</h3>
                    <p>{task.location.building.name}</p>
                    <p>On floor {task.location.floor}</p>
                    <p>In room {task.location.room}</p>
                </div>
                {FertSlider(task.health.fertilizer.amount)}

                <button
                    className="btn"
                    onClick={() => completeTask(task._id, 'fertilize')}
                >
                    Complete task
                </button>
            </div>
        ))
    }

    if (!wTasksList && !fTasksList) {
        return <p className="dueTime">No current tasks</p>
    } else {
        return (
            <div className="tasksContainer">
                <div>
                    <h3>Watering tasks</h3>
                    {wTasksList ? (
                        wTasksList
                    ) : (
                        <p className="dueTime">No current watering tasks</p>
                    )}
                </div>
                <div>
                    <h3>Fertilizing tasks</h3>
                    {fTasksList ? (
                        fTasksList
                    ) : (
                        <p className="dueTime">No current fertilizing tasks</p>
                    )}
                </div>
            </div>
        )
    }
}
