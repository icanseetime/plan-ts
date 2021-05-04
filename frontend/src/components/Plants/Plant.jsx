// Detailed overview of a single plant
import React, { useEffect, useState, useContext } from 'react'
//import AllPlants from './AllPlants';
import NewFeedback from '../Feedback/NewFeedback'
import { AuthContext } from '../../utils/context'

import {ChangeTime,WaterSlider,FertSlider,SunSlider,calcDaysRemaining
} from '../../utils/functions.jsx'
import MovePlant from './Forms/MovePlant'
import axios from 'axios'
import AddPlant from './Forms/AddPlant'
import EditPlant from './Forms/EditPlant'

export default function Plant(props) {
    const authContext = useContext(AuthContext)
    const [sendingFeedback, setSendingFeedback] = useState(false)
    const [movingPlant, setMovingPlant] = useState(false)
    const [editingPlant, setEditingPlant] = useState(false)
    const [historyArray, setHistoryArray] = useState([])
    const [notes, setNotes] = useState('')

    //GET TOKEN
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }

    const getHistory = () => {
        axios
            .get(`/api/plants/${props.plant._id}/history`, { headers })
            .then((res) => setHistoryArray(res.data))
            .catch((err) => console.log('Error | ', err))
    }
    const getNotes = () => {
        if (props.plant !== undefined) {
            axios
                .get(`/api/plants/${props.plant._id}/notes`, { headers })
                .then((res) => setNotes(res.data.notes))
                .catch((err) => console.log('Error | ', err))
        } else {
            setNotes('Loading notes...')
        }
    }

    useEffect(() => {
        getHistory()
        getNotes()
    }, [])

    const displayPlant = (props) => {
        const plant = props.plant
        const history = historyArray.history

        let waterDue = calcDaysRemaining(plant.health.water.due)
        let fertDue = calcDaysRemaining(plant.health.fertilizer.due)

        if (plant) {
            return (
                <div>
                    {!sendingFeedback && !movingPlant && !editingPlant && (
                        <div className="plant singlePlant">
                            <h1 className="plantName">{plant.name}</h1>
                            <div className="imgSlider">
                                <div id="plantSlider">
                                    <h2>Plant needs:</h2>
                                    <span>Water</span>
                                    {WaterSlider(plant.health.water.amount)}
                                    <span>Fertilizer</span>
                                    {FertSlider(plant.health.fertilizer.amount)}
                                    <span>Sunlight</span>
                                    {SunSlider(plant.health.light.amount)}
                                </div>

                                <div id="coverPlant">
                                    <img
                                        src={`/assets/uploaded-plants/${plant.picture}`}
                                        alt={
                                            plant.picture !== 'no-image.png'
                                                ? `Image of ${plant.name}`
                                                : 'No image provided'
                                        }
                                    />
                                </div>
                            </div>
                            <div id="duedatePlant">
                                {waterDue >= 1 ? (
                                    <p className="watr">
                                        Water the plant in{' '}
                                        <span>{waterDue}</span> day
                                        {waterDue !== 1 ? 's' : ''}!
                                    </p>
                                ) : (
                                    <p className="watr">
                                        Water the plant today!
                                    </p>
                                )}
                                {fertDue >= 1 ? (
                                    <p className="watr">
                                        Fertilize the plant in{' '}
                                        <span>{fertDue}</span> day
                                        {fertDue !== 1 ? 's' : ''}!
                                    </p>
                                ) : (
                                    <p className="watr">
                                        Fertilize the plant today!
                                    </p>
                                )}
                            </div>
                            <div className="locationInfo">
                                <div className="mazem">
                                    {/* <h2>Location:</h2>
                                    <p>{plant.location.building.name}</p>
                                    <p>{plant.location.floor}</p>
                                    <p>{plant.location.room}</p> */}
                                    <iframe
                                        className="mazemap"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight="0"
                                        marginWidth="0"
                                        src={plant.location.mazemap_embed}
                                        allow="geolocation"
                                    ></iframe>
                                </div>

                                <div id="plantInfo">
                                    <h2>Information about {plant.name}</h2>
                                    <p>
                                        Need water every{' '}
                                        <span>
                                            {plant.health.water.days_between}
                                        </span>{' '}
                                        day
                                    </p>
                                    <p className="fert">
                                        Need fertilizer every{' '}
                                        <span>
                                            {
                                                plant.health.fertilizer
                                                    .days_between
                                            }
                                        </span>{' '}
                                        day
                                    </p>
                                    <p>
                                        Next water due date is:{' '}
                                        <span>
                                            {ChangeTime(plant.health.water.due)}
                                        </span>
                                    </p>
                                    <p className="fert">
                                        Next fertilizer due date is:{' '}
                                        <span>
                                            {ChangeTime(
                                                plant.health.fertilizer.due
                                            )}
                                        </span>
                                    </p>
                                    <p>
                                        The plant was added:{' '}
                                        {ChangeTime(plant.createdAt)}
                                    </p>
                                </div>
                            </div>
                            {authContext.role !== 'guest' && (
                                <div className="history">
                                    <h2>History</h2>
                                    {history ? (
                                        history.map((history) => {
                                            return (
                                                <div
                                                    className="historyCard"
                                                    key={history._id}
                                                >
                                                    <div>
                                                        <p>WIP</p>
                                                        <p>
                                                            {history.type
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                history.type.slice(
                                                                    1
                                                                )}
                                                        </p>
                                                        <p>{history.note}</p>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            {ChangeTime(
                                                                history.date
                                                            )}
                                                        </p>
                                                        {history.user_id ? (
                                                            <p>
                                                                {
                                                                    history
                                                                        .user_id
                                                                        .name
                                                                        .first
                                                                }{' '}
                                                                {
                                                                    history
                                                                        .user_id
                                                                        .name
                                                                        .last
                                                                }
                                                            </p>
                                                        ) : (
                                                            <p>Unknown</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p>Loading history...</p>
                                    )}
                                </div>
                            )}
                            {authContext.role !== 'guest' && (
                                <div className="notes">
                                    <h2>Notes</h2>
                                    {notes !== undefined ? (
                                        <p>{notes}</p>
                                    ) : (
                                        <p>Loading notes...</p>
                                    )}
                                    {/* TODO Notes -> Plant */}
                                </div>
                            )}
                            <div className="buttons">
                                {/*
                                    Guest:
                                        - Feedback btn
                                        -skal ikke se need water in x days, eller kan se alt men ikke gjøre no med det? 
                                        -borsett fra knappene ofc - å history

                                    Gardener:
                                        (- Water plant btn
                                        - Fertilize plant btn ?)
                                        - Move plant btn
                                        - Feedback btn ?
                                        -skal se schedualen bare ikke adde planten"

                                    Manager:
                                        (- Water plant btn
                                        - Fertilize plant btn ?)
                                        - Move plant btn
                                        - Update details of plant btn
                                        -set the watering schedual (blir gjort når den planten blir adda)


                                */}
                                <div
                                    className={ authContext.role != 'guest' ? 'taskbtns' : 'taskbtn' } >
                                    {authContext.role !== 'guest' && ( //TODO ikke la hover funke når dæm e disabled
                                        <div id="taskL">
                                            <button
                                                disabled={ waterDue >= 2 ? true : false }
                                                className={ !waterDue >= 2 ? 'wtrbtn' : 'wtrbtn off' }
                                                //onClick={}
                                            > Water </button>
                                            <button
                                                disabled={ fertDue >= 2 ? true : false }
                                                className={ !fertDue >= 2 ? 'fertbtn' : 'fertbtn off' }
                                            > Fertilize </button>
                                        </div>
                                    )}
                                    <div id="taskR">
                                        {authContext.role !== 'guest' && (
                                            <button
                                                onClick={() =>
                                                    setMovingPlant(true)
                                                }
                                                className="mvebtn"
                                            >
                                                Move Plant
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                setSendingFeedback(true)
                                            }
                                            className="fbbtn"
                                        >
                                            Send Feedback
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {authContext.role === 'manager' && (
                                <button
                                    onClick={() => setEditingPlant(true)}
                                    className="viewbtn"
                                >
                                    Edit Plant
                                </button>
                            )}
                            <button
                                onClick={() => props.onClick()}
                                className="viewbtn"
                            >
                                Back
                            </button>
                        </div>
                    )}
                    {sendingFeedback && (
                        <div>
                            <NewFeedback
                                plant={props.plant}
                                onClick={() => setSendingFeedback(false)}
                            />
                        </div>
                    )}
                    {movingPlant && (
                        <div>
                            <MovePlant
                                onClick={() => setMovingPlant(false)}
                                locations={props.locations}
                                buildings={props.buildings}
                                plant={props.plant}
                            />
                        </div>
                    )}
                    {editingPlant && (
                        <div>
                            <EditPlant
                                refresh={props.refresh}
                                onClick={() => setEditingPlant(false)}
                                locations={props.locations}
                                buildings={props.buildings}
                                plant={props.plant}
                            />
                        </div>
                    )}
                </div>
            )
        } else {
            return <h3>No plants availible yet.</h3>
        }
    }

    return <div>{displayPlant(props)}</div>
}
