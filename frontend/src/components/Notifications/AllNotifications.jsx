import React from 'react';
import { WaterSlider, FertSlider, calcDaysRemaining } from '../../utils/functions';


// !! Componenet that gets all tasks that are not due today, nor overdue
export default function AllNotifications(props) {
    let fTasks = props.notDueFertilizeNotifications;
    let wTasks = props.notDueWaterNotifications;
    //console.log('ALL NOTIF: ',wTasks);


    let wTasksList;
    if (wTasks.length > 0) {
        wTasksList = wTasks.map((task) => (
            <div className="oneTask" key={task._id}>
                <p>{task.name}</p>
                <p>{calcDaysRemaining(task.health.water.due)} day(s) remaining.</p>
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
                <p>{task.name}</p>
                <p>{calcDaysRemaining(task.health.fertilizer.due)} day(s) remaining.</p>
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