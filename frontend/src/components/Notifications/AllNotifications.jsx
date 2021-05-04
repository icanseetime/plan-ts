import React from 'react';
import { WaterSlider, FertSlider, calcDaysRemaining } from '../../utils/functions';


// !! Componenet that gets all tasks that are not due today, nor overdue
export default function AllNotifications(props) {
    let fTasks = props.notDueFertilizeNotifications;
    let wTasks = props.notDueWaterNotifications;



    let wTasksList;
    if (wTasks.length > 0) {
        wTasksList = wTasks.map((task) => (

            <div className="oneTask" key={task._id}>
                <h4>{task.name}</h4>
                <p>{calcDaysRemaining(task.health.water.due) + 1} day{calcDaysRemaining(task.health.water.due) + 1 !== 1 ? 's' : ''}  remaining.</p>
                <div className="locInfo">
                    <h3>Location</h3>
                    <p>{task.location.building.name}</p>
                    <p>On floor {task.location.floor}</p>
                    <p>In room {task.location.room}</p>
                </div>
                {WaterSlider(task.health.water.amount)}
            </div>
        ))
    } else {
        return (
            <p className="dueTime">No tasks at the moment</p>
        )
    }

    let fTasksList;
    if (fTasks.length > 0) {
        fTasksList = fTasks.map((task) => (
            <div className="oneTask" key={task._id}>
                <h4>{task.name}</h4>
                <p>{calcDaysRemaining(task.health.fertilizer.due) + 1} day{calcDaysRemaining(task.health.fertilizer.due) + 1 !== 1 ? 's' : ''} remaining.</p>
                <div className="locInfo">
                    <h3>Location</h3>
                    <p>{task.location.building.name}</p>
                    <p>On floor {task.location.floor}</p>
                    <p>In room {task.location.room}</p>
                </div>
                {FertSlider(task.health.fertilizer.amount)}
            </div>
        ))
    } else {
        return (
            <p className="dueTime" >No tasks at the moment</p>
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