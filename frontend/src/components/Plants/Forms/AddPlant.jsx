import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

// Components
import Slider from '../Slider'

// Authentication
import { AuthContext } from './../../../utils/context'

export default function AddPlant(props) {
    const path = require('path');
    const authContext = useContext(AuthContext)

    // General Inputs
    const [plantName, setPlantName] = useState('')
    const [plantNotes, setPlantNotes] = useState('')
    const [daysBetweenWtr, setDaysbetweenWtr] = useState(1)
    const [daysBetweenFrt, setDaysbetweenFrt] = useState(1)
    const [waterDueDate, setWaterDueDate] = useState('')
    const [frtDueDate, setFrtDueDate] = useState('')
    const [waterAmount, setWaterAmount] = useState(2)
    const [fertilizerAmount, setFertilizerAmount] = useState(2)
    const [lightAmount, setLightAmount] = useState(3)

    // Relocate
    const [willRelocate, setWillRelocate] = useState(false)

    // Location
    const [buildings, setBuildings] = useState([]);
    const [building, setBuilding] = useState('')
    const [floors, setFloors] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [locationObj, setLocationObj] = useState('');

    // Image File
    const [file, setFile] = useState('')
    const [err, setErr] = useState({ isErr: false, typemsg: '', sizemsg: '' })

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
        getRooms(building, e.target.value) // To new api call
    }

    // API Call | Get all floors after selecting building
    const getRooms = (building, floor) => {
        axios.get(`/api/locations/${building}/${floor}/rooms`) //buildings blir undefined
            .then(res => {
                setRooms(res.data);
            })
            .catch(err => console.log('Error! ', err))
    };

    // Room select | Set location object
    const handleRoomChange = (e) => {
        setLocationObj(e.target.value) // Store value
    }
    //// END OF LOCATION HANDLING ////

    // Image file handling
    const onPicChange = (e) => {
        // Type
        let fileType;
        fileType = path.extname(e.target.files[0].name) ? path.extname(e.target.files[0].name) : null;
        let validFileType = false;

        // Size
        let size = e.target.files[0].size;
        let sizeMB = Math.round((size / 1024) / 1024);

        // Check type
        switch (fileType) {
            case '.jpg': validFileType = true; setErr({ isErr: false, typemsg: '' }); break;
            case '.jpeg': validFileType = true; setErr({ isErr: false, typemsg: '' }); break;
            case '.png': validFileType = true; setErr({ isErr: false, typemsg: '' }); break;
            default: setErr({ isErr: true, typemsg: 'Not a valid filetype. Please use JPG or PNG.' }); break;
        }

        // Check size
        if (sizeMB >= 5) { setErr({ isErr: true, sizemsg: 'File too large' }) }
        else if (sizeMB <= 5 && validFileType === true) {
            setFile(e.target.files[0]);
            setErr({ isErr: false, sizemsg: '' })
        }
    }

    // API Call || Upload image
    const onSubmit = async (e) => {
        let confirm = window.confirm('Confirm plant addition')
        if (confirm === true) {
            e.preventDefault()
            if (file) {
                if (err.isErr === true) alert('Please select a valid file.')
                else {
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
                        const { filename } = await res.data
                        await addPlant(e, filename);
                    } catch (err) {
                        if (err.response.status === 500) {
                            console.log('Server error', err.response.data.error)
                        } else {
                            console.log(err.response.data.error)
                        }
                    }
                }
            } else {
                addPlant(e);
            }
        }
    }

    // API Call | Add new plant
    const addPlant = (e, imgurl) => {
        e.preventDefault()
        let data = {
            'name': plantName,
            'location': locationObj,
            'notes': plantNotes,
            'waterDaysBetween': daysBetweenWtr,
            'fertilizerDaysBetween': daysBetweenFrt,

            'waterDue': waterDueDate,
            'fertilizerDue': frtDueDate,

            'fertilizerAmount': fertilizerAmount,
            'waterAmount': waterAmount,
            'lightAmount': lightAmount
        };
        if (imgurl) {
            data.picture = imgurl
        }
        console.log(data)
        axios.post(`/api/plants`, data, { headers })
            .then(res => {
                alert("Successfully added ", plantName)
                //props.setIsAdding(false)
                setWillRelocate(true)
            })
            .catch(err => {
                console.log("Error | ", err)
            })
    }

    //// RENDER //// 
    if (willRelocate === true) return <Redirect to="/plantsoverview" />
    if (authContext.role === 'manager') {
        return (
            <div>
                <h1>Add a new plant</h1>
                <div className="inputs">
                    <form className="plantForms" onSubmit={(e) => onSubmit(e)}>
                        <div className="twoColContainer">
                            <div>
                                <div className="singleInput">
                                    <h3>Name and image</h3>
                                    <label htmlFor="plantName">Plant name</label>
                                    <div className="inputcontainer">
                                        <input
                                            required
                                            name="plantName"
                                            type="text"
                                            value={plantName}
                                            onChange={(e) => setPlantName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="singleInput">
                                    <label htmlFor="imgFile">Upload image</label>
                                    <div>
                                        <input
                                            required
                                            name="imgFile"
                                            id="file"
                                            type="file"
                                            onChange={(e) => onPicChange(e)}
                                        />
                                        <p className="err">{(err.isErr && err.typemsg) && err.typemsg}</p>
                                        <p className="err">{(err.isErr && err.sizemsg) && err.sizemsg}</p>
                                    </div>
                                </div>
                                <div className="singleInput">
                                    <h3>Set the watering schedule</h3>
                                    <label htmlFor="waterBetween">Days between watering</label>
                                    <div className="inputcontainer">
                                        <input
                                            name="waterBetween"
                                            className="between"
                                            type="number"
                                            min='1'
                                            max='365'
                                            value={daysBetweenWtr}
                                            onChange={(e) => setDaysbetweenWtr(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="fertilizerBetween">Days between the fertilizing</label>
                                    <div className="inputcontainer">
                                        <input
                                            name="fertilizerBetween"
                                            className="between"
                                            type="number"
                                            min='1'
                                            max='365'
                                            value={daysBetweenFrt}
                                            onChange={(e) => setDaysbetweenFrt(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="singleInput">
                                    <label htmlFor="waterDue">Next watering due date</label>
                                    <div className="inputcontainer">
                                        <input
                                            name="waterDue"
                                            className="between"
                                            type="date"
                                            value={waterDueDate}
                                            onChange={(e) => setWaterDueDate(e.target.value)}
                                        />
                                    </div>
                                    <label htmlFor="fertilizerDue">Next Fertalizing due date</label>
                                    <div className="inputcontainer">
                                        <input
                                            name="fertilizerDue"
                                            className="between"
                                            type="date"
                                            value={frtDueDate}
                                            onChange={(e) => setFrtDueDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="singleInput">
                                    <Slider
                                        setWaterAmount={(v) => setWaterAmount(v)}
                                        setFertilizerAmount={(v) => setFertilizerAmount(v)}
                                        setLightAmount={(v) => setLightAmount(v)}
                                    />
                                </div>
                                <div className="singleInput">
                                    <h3>Location</h3>
                                    {/* Building */}
                                    <label htmlFor="building">Select building</label>
                                    <div className="inputcontainer">
                                        <select
                                            defaultValue
                                            onChange={handleBuildingChange}
                                            name="building"
                                            id="buildingSelect"
                                        ><option value="">-- Select building --</option>
                                            {buildings &&
                                                buildings.map((building) => {
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

                                    {/* Floor */}
                                    <label htmlFor="floor">Select floor</label>
                                    <div className="inputcontainer">
                                        <select
                                            defaultValue
                                            onChange={handleFloorChange}
                                            name="floor"
                                            id="floorSelect"
                                        ><option value="">-- Select floor --</option>
                                            {floors.map((floor) => {
                                                return (
                                                    <option key={floor} value={floor}>
                                                        {floor}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    {/* Room */}
                                    <label htmlFor="room">Select room</label>
                                    <div className="inputcontainer">
                                        <select
                                            defaultValue
                                            name="room"
                                            id="roomSelect"
                                            onChange={handleRoomChange}
                                        ><option value="">-- Select room --</option>
                                            {rooms.map((room) => {
                                                return (
                                                    <option key={room._id} value={room._id}>
                                                        {room.room}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="singleInput">
                                    <label htmlFor="notes">Plant Notes</label>
                                    <div className="inputcontainer">
                                        <textarea
                                            id="plantNotes"
                                            name="notes"
                                            value={plantNotes}
                                            onChange={(e) => setPlantNotes(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="formButtons">
                            <button
                                type="submit"
                                className="btn"
                            >Add Plant</button>
                            <Link to='/plantsoverview'>
                                <button className="btn"
                                >Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}