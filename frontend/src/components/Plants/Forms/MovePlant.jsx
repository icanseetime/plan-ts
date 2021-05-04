/*
    Choose building(dropdown), then floor(dropdown) appears if building, then room(dropdown) appears if floor -> get room uid value and send to backend at submit, along with plant id, which is gotten from
    const [build, setBuild]
    const [floor, setFloor]
    const [room, setRoom]

    props -> location

    onSubmit -> handleSubmit
    handleSubmit -> props.updateLocation(room_uid)

    --> some other parent component --> updateLocation takes in room_uid and plant_id, then axios time

    maybe - https://codesandbox.io/s/lr3m7wrn19
*/

import React, { useState, useEffect } from "react"
import axios from 'axios';

export default function MovePlant(props) {
    const [buildings, setBuildings] = useState([]);
    const [building, setBuilding] = useState('')

    const [floors, setFloors] = useState([]);
    const [floor, setFloor] = useState('');

    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState('');

    const [locationObj, setLocationObj] = useState('');
        //// Everything is placed in order ////

    // API Call | Get all locations (buildings)
    const getBuildings = () => {
        axios.get('/api/locations/buildings')
            .then(res => {
                setBuildings(res.data);
            })
            .catch(err => console.log('Error! ', err))
    };

    // Run getBuildings at start
    useEffect(() => {
        getBuildings();
    }, []);

    // Building select
    const handleBuildingChange = (e) => {
        setBuilding(e.target.value) // Store value
        getFloors(e.target.value)   // To new api call
    }

    // API Call | Get all floors after selecting building
    const getFloors = (building) => {
        axios.get(`/api/locations/${building}/floors`) 
            .then(res => {
                setFloors(res.data);
            })
            .catch(err => console.log('Error! ', err))
    };

    // Floor select
    const handleFloorChange = (e) => {
        setFloor(e.target.value) // Store value
        getRooms( building, e.target.value) // To new api call
    }

    // API Call | Get all floors after selecting building
    const getRooms = (building, floor) => {
        axios.get(`/api/locations/${building}/${floor}/rooms`) //buildings blir undefined
            .then(res => {
                setRooms(res.data);
            })
            .catch(err => console.log('Error! ', err))
    };
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
        e.preventDefault();
        alert(`${props.plant.name} has succeessfully been moved`)
        let body = {
            location: locationObj
        };

        axios.put(`/api/plants/${props.plant._id}/move`, body, { headers })
        .then( res => {
            console.log('Plant moved successfully')
            props.onClick();
        })
        .catch( err => console.log('Error | ', err))
    }

    if (buildings.length > 0) {
        return (
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>Move Plant</h1>
                {/* Building */}
                <div className="inputs">
                    <h3>Select building</h3>
                    <select
                        defaultValue
                        onChange={handleBuildingChange}
                        name="building"
                        id="buildingSelect"
                    >
                        <option value="">-- Select building --</option>
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

                    {/* Floor */}
                    <h3>Select floor</h3>
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

                    {/* Room */}
                    <h3>Select room</h3>
                    <select
                        defaultValue
                        name="room"
                        id="roomSelect"
                        onChange={handleRoomChange}
                    >
                        <option value="">-- Select room --</option>
                        {rooms.map((room, idex) => {
                            return (
                                <option key={room._id} value={room._id}>
                                    {room.room}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <button type="submit" className="updatebtn">
                    Save New Location
                </button>

                <button
                    type="button"
                    onClick={() => props.onClick()}
                    className="updatebtn"
                >
                    Cancel
                </button>
            </form>
        )
    } else {
        return <p>Loading...</p>
    }
}