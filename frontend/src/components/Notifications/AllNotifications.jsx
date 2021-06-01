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
                <h3 className="taskName">{task.name}</h3>
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
    }

    let fTasksList;
    if (fTasks.length > 0) {
        fTasksList = fTasks.map((task) => (
            <div className="oneTask" key={task._id}>
                <h3 className="taskName">{task.name}</h3>
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
    }

    if (!wTasksList && !fTasksList) {
        return (<p className="dueTime" >No current tasks</p>)
    } else {
        return (
            <div className="tasksContainer">
                <div>
                    <h3>Watering tasks</h3>
                    {wTasksList ? wTasksList : <p className="dueTime" >No watering tasks in the near future</p>}
                </div>
                <div>
                    <h3>Fertilizing tasks</h3>
                    {fTasksList ? fTasksList : <p className="dueTime">No fertilizing tasks in the near future</p>}
                </div>
            </div>
        )
    }
}