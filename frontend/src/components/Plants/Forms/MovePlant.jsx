import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../../utils/context'

export default function MovePlant(props) {
    const authContext = useContext(AuthContext)

    const [buildings, setBuildings] = useState([])
    const [building, setBuilding] = useState('')

    const [floors, setFloors] = useState([]);

    const [rooms, setRooms] = useState([]);

    const [locationObj, setLocationObj] = useState('');
    const [note, setNote] = useState('');
    const [err, setErr] = useState('');

    // API Call | Get all locations (buildings)
    const getBuildings = () => {
        axios
            .get('/api/locations/buildings')
            .then((res) => {
                setBuildings(res.data)
            })
            .catch((err) => console.log('Error! ', err))
    }

    // Run getBuildings at start
    useEffect(() => {
        getBuildings()
    }, [])

    // Building select
    const handleBuildingChange = (e) => {
        setBuilding(e.target.value) // Store value
        getFloors(e.target.value) // To new api call
    }

    // API Call | Get all floors after selecting building
    const getFloors = (building) => {
        axios
            .get(`/api/locations/${building}/floors`)
            .then((res) => {
                setFloors(res.data)
            })
            .catch((err) => console.log('Error! ', err))
    }

    // Floor select
    const handleFloorChange = (e) => {
        getRooms(building, e.target.value) // To new api call
    }

    // API Call | Get all floors after selecting building
    const getRooms = (building, floor) => {
        axios
            .get(`/api/locations/${building}/${floor}/rooms`) //buildings blir undefined
            .then((res) => {
                setRooms(res.data)
            })
            .catch((err) => console.log('Error! ', err))
    }
    // Room select
    const handleRoomChange = (e) => {
        setLocationObj(e.target.value) // Store value
        //saveNewLocation( building, e.target.value) // To new api call
    }

    //GET TOKEN
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }

    // Upon submit
    const handleSubmit = (e) => {
        e.preventDefault()

        if (locationObj !== '') {
            let body = {
                user_id: authContext.userid,
                location: locationObj,
                note: note
            }

            axios
                .put(`/api/plants/${props.plant._id}/move`, body, { headers })
                .then((res) => {
                    alert(`${props.plant.name} has succeessfully been moved`)
                    props.onClick()
                })
                .catch((err) => console.log('Error | ', err))
        } else setErr('Please select building, floor and room.')
    }

    if (buildings.length > 0) {
        return (
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>Move Plant</h1>

                {/* Building */}
                <div className="inputs">
                    <div className="plantForms movePlant">
                        <div className="singleInput">
                            <h3>Select building</h3>
                            <div className="inputcontainer">
                                <select
                                    defaultValue
                                    onChange={handleBuildingChange}
                                    name="building"
                                    id="buildingSelect"
                                >
                                    {' '}
                                    <option value="">
                                        -- Select building --
                                    </option>
                                    {buildings &&
                                        buildings.map((building, idex) => {
                                            return (
                                                <option
                                                    key={building.no}
                                                    value={building.no}
                                                >
                                                    {building.name}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                        </div>

                        {/* Floor */}
                        <div className="singleInput">
                            <h3>Select floor</h3>
                            <div className="inputcontainer">
                                <select
                                    defaultValue
                                    onChange={handleFloorChange}
                                    name="floor"
                                    id="floorSelect"
                                >
                                    <option value="">-- Select floor --</option>
                                    {floors.map((floor, idex) => {
                                        return (
                                            <option key={floor} value={floor}>
                                                {floor}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        {/* Room */}
                        <div className="singleInput">
                            <h3>Select room</h3>
                            <div className="inputcontainer">
                                <select
                                    defaultValue
                                    name="room"
                                    id="roomSelect"
                                    onChange={handleRoomChange}
                                >
                                    <option value="">-- Select room --</option>
                                    {rooms.map((room, idex) => {
                                        return (
                                            <option
                                                key={room._id}
                                                value={room._id}
                                            >
                                                {room.room}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <p className="err">{err}</p>
                        </div>

                        <div className="singleInput">
                            <label htmlFor="note">Note</label>
                            <div className="inputcontainer">
                                <textarea
                                    name="note"
                                    id="note"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="updatebtn">
                    {' '}
                    Save New Location{' '}
                </button>
                <button
                    type="button"
                    onClick={() => props.onClick()}
                    className="updatebtn"
                >
                    {' '}
                    Cancel{' '}
                </button>
            </form>
        )
    } else {
        return <p>Loading...</p>
    }
}
