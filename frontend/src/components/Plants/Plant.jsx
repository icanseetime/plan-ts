import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

// Functions
import { AuthContext } from '../../utils/context'
import { ChangeTime, WaterSlider, FertSlider, SunSlider, calcDaysRemaining } from '../../utils/functions.jsx'

// Components
import EditPlant from './Forms/EditPlant'
import MovePlant from './Forms/MovePlant'
import NewFeedback from '../Feedback/NewFeedback'

// Detailed overview of a single plant
export default function Plant() {
    const authContext = useContext(AuthContext)

    const [sendingFeedback, setSendingFeedback] = useState(false)
    const [movingPlant, setMovingPlant] = useState(false)
    const [editingPlant, setEditingPlant] = useState(false)

    const [historyArray, setHistoryArray] = useState([])
    const [notes, setNotes] = useState('');
    const [plant, setPlant] = useState();

    // Get plant's id based on state sent along with Link
    const location = useLocation();
    const { _id } = location.state;
    //console.log('id: ', _id)

    //GET TOKEN
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }

    // API Call | Get one plant
    useEffect(() => {
        getHistory(_id)
        getNotes(_id)
        axios.get(`/api/plants/${_id}`)
            .then(async (res) => {
                // Set plant object as state
                await setPlant(res.data)
            })
            .catch((err) => {
                console.log('Error | ', err)
            })
    }, _id, historyArray, notes);

    // API Call || Get plant's history
    const getHistory = (id) => {
        axios.get(`/api/plants/${id}/history`, { headers })
            .then((res) => {
                let resp = res.data.history;
                let histArr = resp.reverse();
                setHistoryArray(histArr)

                console.log(histArr)
            })
            .catch((err) => console.log('Error | ', err))
    }

    // API Call || Get plant's notes
    const getNotes = (id) => {
        axios.get(`/api/plants/${id}/notes`, { headers })
            .then((res) => setNotes(res.data.notes))
            .catch((err) => console.log('Error | ', err))
    }

    // API Call || Complete a task and update database
    const completeTask = (taskType) => {
        let confirm = window.confirm('Please confirm completion')
        if(confirm === true){
        let data = { user_id: authContext.userid } // To see who completed the task

        // Water tasks
        if (taskType === "water") {
            axios.put(`/api/plants/${_id}/water`, data, { headers })
                .then(res => {
                    alert('Plant has been watered!')
                    window.location.reload(false)
                })
                .catch(err => {
                    console.log('Error | ', err)
                })
        // Fertilization tasks
        } else if (taskType === "fertilize") {
            axios.put(`/api/plants/${_id}/fertilize`, data, { headers })
                .then(res => {
                    alert('Plant has been fertilized!')
                    window.location.reload(false)
                })
                .catch(err => {
                    console.log('Error | ', err)
        })}}}

    // Render
    if (plant) {
        let history = historyArray;
        let waterDue = calcDaysRemaining(plant.health.water.due);
        let fertDue = calcDaysRemaining(plant.health.fertilizer.due);
        return (
            <div className="singlePlantContainer">
                {!sendingFeedback && !movingPlant && !editingPlant && (
                    <div className="plant singlePlant">
                        <h1>{plant.name}</h1>
                        <div className="imgSlider">
                            <div id="plantSlider">
                                <h2>Plant needs:</h2>
                                {WaterSlider(plant.health.water.amount)}
                                {FertSlider(plant.health.fertilizer.amount)}
                                {SunSlider(plant.health.light.amount)}
                            </div>
                            <div className="cover">
                                <img 
                                    src={`/assets/uploaded-plants/${plant.picture}`}
                                    onError={(e)=>{e.target.onerror = null; e.target.src=`/assets/uploaded-plants/no-image.png`}}
                                    alt={plant.picture !== 'no-image.png' ? `Image of ${plant.name}` : 'No image provided'}
                                />
                            </div>
                        </div>
                        <div id="duedatePlant">
                            {waterDue >= 1 ? (<p className="watr">Water the plant in <span>{waterDue}</span> day{waterDue !== 1 ? 's' : ''}!</p>
                            ) : (<p className="watr">Water the plant <span>today</span>!</p>)}
                            {fertDue >= 1 ? (<p className="watr">Fertilize the plant in <span>{fertDue}</span> day{fertDue !== 1 ? 's' : ''}!</p>
                            ) : (<p className="watr">Fertilize the plant <span>today</span>!</p>)}
                        </div>
                        <div id="plantInfo">
                            <h2>Information about {plant.name}</h2>
                            <div id="plantInfoInner">
                                <div>
                                    <div>
                                        <h3>Location:</h3>
                                        <div className="miniCard">
                                            <p>{plant.location.building.name}</p>
                                            <p>{plant.location.floor}</p>
                                            <p>{plant.location.room}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Watering and fertilization</h3>
                                        <div className="miniCard">
                                            <p> Needs water every <span>{plant.health.water.days_between}</span> day </p>
                                            <p className="fert"> Needs fertilizer every <span>{plant.health.fertilizer.days_between}</span> day </p>
                                            <p> Next water due date is: <span>{ChangeTime(plant.health.water.due)}</span> </p>
                                            <p className="fert"> Next fertilizer due date is: <span>{ChangeTime(plant.health.fertilizer.due)}</span> </p>
                                            <p> The plant was added: {ChangeTime(plant.createdAt)} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mazem">
                                    <iframe
                                        className="mazemap"
                                        frameBorder="0"
                                        src={plant.location.mazemap_embed}
                                        allow="geolocation"
                                    ></iframe>
                                </div>
                            </div>
                        </div>

                        {authContext.role !== 'guest' && ( // Notes
                            <div className="notes">
                                <h2>Notes</h2>
                                {!notes && <p>No notes</p>}
                                {notes !== undefined ? ( <p>{notes}</p> ) : ( <p>Loading notes...</p> )}
                            </div>
                        )}
                        {authContext.role !== 'guest' && ( // History
                            <div className="history">
                                <h2>History</h2>
                                <div className="innerHistory">
                                    {history ? 
                                    history >=0 ?  <p>No history</p> :
                                    ( history.map((history) => {
                                            return (
                                                <div className="historyCard" key={history._id}>
                                                    <p>Plant was <span>{history.type.charAt(0).toUpperCase() + history.type.slice(1)}{history.type == 'water' ? 'ed' : 'd'}</span> at {ChangeTime(history.date)} by {history.user_id ? (
                                                        <> {history.user_id.name.first} {history.user_id.name.last}</>
                                                    ) : ( <>unknown</>
                                                    )}</p>
                                                    {history.note && (
                                                        <>
                                                            <h4>Note:</h4>
                                                            <p>{history.note}</p>
                                                        </>
                                                    )}
                                                </div>
                                            )
                                        })
                                    ) : getHistory() + (
                                        <p>Loading history...</p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="plantButtons">
                            <div
                                className="taskbtns" >
                                {authContext.role !== 'guest' && (
                                    <div>
                                        {/* Add requests here. */}
                                        <button
                                            disabled={waterDue >= 2 ? true : false}
                                            className={!waterDue >= 2 ? 'wtrbtn' : 'wtrbtn off'}
                                            onClick={( ) => completeTask('water')}
                                        > Water </button>
                                        <button
                                            disabled={fertDue >= 2 ? true : false}
                                            className={!fertDue >= 2 ? 'fertbtn' : 'fertbtn off'}
                                            onClick={ () => completeTask('fertilize')}
                                            > Fertilize </button>
                                    </div>
                                )}
                                <div>
                                    {authContext.role !== 'guest' && (
                                        <button
                                            onClick={() =>
                                                setMovingPlant(true)
                                            }
                                            className="moveFeedbackBtn"
                                        > Move Plant </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            setSendingFeedback(true)
                                        }
                                        className="moveFeedbackBtn"
                                    > Send Feedback </button>
                                </div>
                            </div>
                        </div>
                        {authContext.role === 'manager' && (
                            <button
                                onClick={() => setEditingPlant(true)}
                                className="editPlantbtn"
                            >Edit Plant</button>
                        )}

                        <Link className="viewbtn" to='/plantsoverview'>Back</Link>
                    </div>
                )}
                {sendingFeedback && (
                    <div>
                        <NewFeedback
                            plant={plant}
                            onClick={() => setSendingFeedback(false)}
                        />
                    </div>
                )}
                {movingPlant && (
                    <div>
                        <MovePlant
                            onClick={() => setMovingPlant(false)}
                            plant={plant}
                        />
                    </div>
                )}
                {editingPlant && (
                    <div>
                        <EditPlant
                            onClick={() => setEditingPlant(false)}
                            plant={plant}
                        />
                    </div>
                )}
            </div>
        )
    } else {
        return <div><p className="loading">Loading...</p></div>
    }
    //}
    //return <div>{displayPlant()}</div>
}