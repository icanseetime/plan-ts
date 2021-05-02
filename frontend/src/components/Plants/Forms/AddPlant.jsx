import axios from 'axios'
import React, { useState, useContext } from 'react'
import Slider from '../Slider'
import { AuthContext } from './../../../utils/context'

export default function AddPlant(props) {
    const [plantName, setPlantName] = useState('')
    const [plantFile, setPlantFile] = useState('')
    const [plantNotes, setPlantNotes] = useState('')
    const [daysBetweenWtr, setDaysbetweenWtr] = useState(0)
    const [daysBetweenFrt, setDaysbetweenFrt] = useState(0)
    const [waterDueDate, setWaterDueDate] = useState('')
    const [frtDueDate, setFrtDueDate] = useState('')

    const [file, setFile] = useState('')
    const [picture, setPicture] = useState('')

    //GET TOKEN
    const token = localStorage.getItem('token')

    const onPicChange = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)

        try {
            // Upload image file
            const res = await axios.post('/api/pictures', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })

            const { filename } = res.data
            setPicture(filename) // Send this with the other request (create new plant / update plant) for "picture" property
        } catch (err) {
            if (err.response.status === 500) {
                console.log('Server error', err.response.data.error)
            } else {
                console.log(err.response.data.error)
            }
        }
    }

    const authContext = useContext(AuthContext)
    //only manager can see the add plant stuff
    if (authContext.role === 'manager') {
        return (
            <div className="inputs">
                <h1>Add a new plant</h1>

                <form className="addPlantForm" onSubmit={onSubmit}>
                    <div id="addPart1">
                        <div className="singleInput">
                            <label>
                                <span>Plant name:</span>
                            </label>
                            <div className="inputcontainer">
                                <input
                                    type="text"
                                    value={plantName}
                                    onChange={(e) =>
                                        setPlantName(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="singleInput">
                            <label>
                                <span>Upload image</span>
                            </label>
                            <div>
                                <input
                                    id="file"
                                    type="file"
                                    value={plantFile}
                                    onChange={onPicChange}
                                />
                                {plantFile && (
                                    <img src={plantFile} alt="plant"></img>
                                )}
                            </div>
                        </div>

                        <div className="singleInput">
                            <h2>Set the watering schedule</h2>
                            <label className="addNeed">
                                <span>Days between watering:</span>
                            </label>
                            <div className="inputcontainer">
                                <input
                                    className="between"
                                    type="number"
                                    value={daysBetweenWtr}
                                    onChange={(e) =>
                                        setDaysbetweenWtr(e.target.value)
                                    }
                                />
                            </div>
                            <label className="addNeed">
                                <span>Days between the fertalizing:</span>
                            </label>
                            <div className="inputcontainer">
                                <input
                                    className="between"
                                    type="number"
                                    value={daysBetweenFrt}
                                    onChange={(e) =>
                                        setDaysbetweenFrt(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="singleInput">
                            <label className="addNeed">
                                <span>Next watering due date:</span>
                            </label>
                            <div className="inputcontainer">
                                <input
                                    className="between"
                                    type="date"
                                    value={waterDueDate}
                                    onChange={(e) =>
                                        setWaterDueDate(e.target.value)
                                    }
                                />
                            </div>
                            <label className="addNeed">
                                <span>Next Fertalizing due date:</span>
                            </label>
                            <div className="inputcontainer">
                                <input
                                    className="between"
                                    type="date"
                                    value={frtDueDate}
                                    onChange={(e) =>
                                        setFrtDueDate(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div id="addPart2">
                        <div className="plantNeeds">
                            <Slider />
                        </div>
                        {/* Dropsdowns for locations. Buildings, Foor, Room */}
                        <div className="singleInput">
                            <label>
                                <span>Location:</span>
                            </label>
                            location
                        </div>

                        <div className="singleInput">
                            <label>
                                <span>Plant Notes</span>
                            </label>
                            <div className="inputcontainer">
                                <textarea
                                    value={plantNotes}
                                    onChange={(e) =>
                                        setPlantNotes(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <button type="submit" className="addPlantBtn">
                            Add Plant
                        </button>
                        <button
                            onClick={() => props.setIsAdding(false)}
                            type="submit"
                            id="canclebtn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
