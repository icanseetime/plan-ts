import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import Slider from '../Slider'
import { AuthContext } from './../../../utils/context'

export default function EditPlant(props) {
    const authContext = useContext(AuthContext)

    // General Inputs
    const [plantName, setPlantName] = useState('')
    const [plantFile, setPlantFile] = useState('')
    const [plantNotes, setPlantNotes] = useState('')
    const [daysBetweenWtr, setDaysbetweenWtr] = useState(0)
    const [daysBetweenFrt, setDaysbetweenFrt] = useState(0)
    const [waterDueDate, setWaterDueDate] = useState('')
    const [frtDueDate, setFrtDueDate] = useState('')
    const [waterAmount, setWaterAmount] = useState('')
    const [fertilizerAmount, setFertilizerAmount] = useState('')
    const [lightAmount, setLightAmount] = useState('')

    // Location
    const [buildings, setBuildings] = useState([]);
    const [building, setBuilding] = useState('')
    const [floors, setFloors] = useState([]);
    const [floor, setFloor] = useState('');
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState('');
    const [locationObj, setLocationObj] = useState('');

    // Image File
    const [file, setFile] = useState('')

    //GET TOKEN
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` } // Just in case :P

        //// Everything is placed in order (LOCATION) ////
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
        getRooms(building, e.target.value) // To new api call
    }

    // API Call | Get all floors after selecting building
    const getRooms = (building, floor) => {
        axios.get(`/api/locations/${building}/${floor}/rooms`) //buildings blir undefined
            .then(res => {
                setRooms(res.data);
                console.log(res.data)
            })
            .catch(err => console.log('Error! ', err))
    };
    // Room select
    const handleRoomChange = (e) => {
        setLocationObj(e.target.value) // Store value
    }
    //// END OF LOCATION HANDLING ////

    // Image file handling
    const onPicChange = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        
        if(file) {
        const formData = new FormData()
        formData.append('file', file)
        try {
            // Upload image file
            const res = await axios.post('/api/pictures', 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                })
            const { filename } = await res.data
            await setPlantFile(filename)
            await addPlant(e, filename);
        } catch (err) {
            if (err.response.status === 500) {
                console.log('Server error', err.response.data.error)
            } else {
                console.log(err.response.data.error)
            }
        }
    } else {
        addPlant(e);
    }
    }

    // API Call | Add new plant
    const addPlant = (e, imgurl) => {
        e.preventDefault()
        let data;
        if(!imgurl) {
            data = {
                'name': plantName,
                'location': locationObj,
                'notes': plantNotes,
                'waterDaysBetween': daysBetweenWtr,
                'waterAmount': waterAmount,
                'waterDue': waterDueDate,
                'fertilizerDaysBetween': daysBetweenFrt,
                'fertilizerAmount': fertilizerAmount,
                'fertilizerDue': frtDueDate,
                'lightAmount': lightAmount
            }
        } else {
            data = {
                'name': plantName,
                'location': locationObj,
                'picture': imgurl,
                'notes': plantNotes,
                'waterDaysBetween': daysBetweenWtr,
                'waterAmount': waterAmount,
                'waterDue': waterDueDate,
                'fertilizerDaysBetween': daysBetweenFrt,
                'fertilizerAmount': fertilizerAmount,
                'fertilizerDue': frtDueDate,
                'lightAmount': lightAmount
            }
        }
        axios.post(`/api/plants`, data, { headers })
        .then( res => {
            alert(plantName, " successfully added.")
            props.setIsAdding(false)
        })
        .catch( err => {
            console.log("Error | ", err)
        })
    }

    //// RENDER //// 
    // Only manager can add plants |
    if (authContext.role === 'manager') {
        return (
            <div className="inputs">
                <h1>Add a new plant</h1>
                <form className="addPlantForm" onSubmit={(e) => onSubmit(e)}>
                    <div id="addPart1">
                        <div className="singleInput">
                            <label>
                                <span>Plant name</span>
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
                                    onChange={onPicChange}
                                />
                            </div>
                        </div>
                        <div className="singleInput">
                            <h2>Set the watering schedule</h2>
                            <label className="addNeed">
                                <span>Days between watering</span>
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
                                <span>Days between the fertilizing</span>
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
                                <span>Next watering due date</span>
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
                                <span>Next Fertalizing due date</span>
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
                            <Slider
                                setWaterAmount={(v) => setWaterAmount(v)}
                                setFertilizerAmount={(v) => setFertilizerAmount(v) }
                                setLightAmount={(v) => setLightAmount(v)}
                            />
                        </div>
                        {/* Dropsdowns for locations. Buildings, Foor, Room */}
                        <div className="singleInput">
                            <label>
                                <span>Location</span>
                            </label>
                            {/* Building */}
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
