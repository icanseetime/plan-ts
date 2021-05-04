import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import Slider from '../Slider'
import { AuthContext } from '../../../utils/context'

export default function AddPlant(props) {
    const authContext = useContext(AuthContext)
    const plant = props.plant;

    // General Inputs
    const [plantName, setPlantName] = useState(plant.name)
    const [plantFile, setPlantFile] = useState('')
    const [plantNotes, setPlantNotes] = useState('')
    const [daysBetweenWtr, setDaysbetweenWtr] = useState(plant.health.water.days_between)
    const [daysBetweenFrt, setDaysbetweenFrt] = useState(plant.health.fertilizer.days_between)
    const [waterAmount, setWaterAmount] = useState(plant.health.water.amount)
    const [fertilizerAmount, setFertilizerAmount] = useState(plant.health.fertilizer.amount)
    const [lightAmount, setLightAmount] = useState(plant.health.light.amount)


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

    // Get plant's notes
    const getNotes = () => {
        if (props.plant !== undefined) {
            axios.get(`/api/plants/${plant._id}/notes`, { headers })
                .then((res) => setPlantNotes(res.data.notes))
                .catch((err) => console.log('Error with notes | ', err))
        } else {
            setPlantNotes('Loading notes...')
        }
    }

    useEffect(() => {
        getNotes()
    }, [])

    const deletePlant = async () => {
        let id = plant._id
        axios
            .delete(`/api/plants/${id}`, { headers })
            .then((res) => {
                alert(`"${plant.name}" successfully deleted.`)
                //props.refresh(false)
                window.location.replace("/plants/overview") //endre kanskje t state?
            })
            .catch((err) => {
                console.log('Error | ', err) 
            })
    }



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
        setFile(e.target.files[0])
    }

    const refreshSite = () => {
        
    }

    const onSubmit = async (e) => {
        if (file) {
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
                addPlant(e, filename);
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
        let data = {
            'name': plantName,
            'notes': plantNotes,
            'picture': plant.picture,
            'waterDaysBetween': daysBetweenWtr,
            'fertilizerDaysBetween': daysBetweenFrt,
            'fertilizerAmount': fertilizerAmount,
            'waterAmount': waterAmount,
            'lightAmount': lightAmount
        };

        if (imgurl) {
            data.picture = imgurl
        }

        console.log(data)
        axios.put(`/api/plants/${plant._id}`, data, { headers })
        .then( res => {
            alert(plant.name, " successfully updated.")
            props.onClick()
            window.location.reload()
        })
        .catch( err => {
            console.log("Error | ", err)
        })
    }

    //// RENDER //// 
    return (
        <div className="inputs">
            <h1>Edit plant</h1>
            <form className="addPlantForm" onSubmit={(e) => onSubmit(e)}>
                <div id="addPart1">
                    <div className="singleInput">
                        <label>
                            <span>Plant name:</span>
                        </label>
                        <div className="inputcontainer">
                            <input
                                type="text"
                                value={plantName}
                                onChange={(e) => setPlantName(e.target.value)}
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
                            <span>Days between watering:</span>
                        </label>
                        <div className="inputcontainer">
                            <input
                                className="between"
                                type="number"
                                value={daysBetweenWtr}
                                onChange={(e) => setDaysbetweenWtr(e.target.value)}
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
                                onChange={(e) => setDaysbetweenFrt(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div id="addPart2">
                    <div className="plantNeeds">
                        <Slider
                            setWaterAmount={(v) => setWaterAmount(v)}
                            setFertilizerAmount={(v) => setFertilizerAmount(v)}
                            setLightAmount={(v) => setLightAmount(v)}
                        />
                    </div>
                    <div className="singleInput">
                        <label><span>Plant Notes</span></label>
                        <div className="inputcontainer">
                            <textarea
                                value={plantNotes}
                                onChange={(e) => setPlantNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="addPlantBtn"
                    >Update Plant</button>
                    <button
                        onClick={() => deletePlant()}
                        type="button"
                        className="btn delbtn"
                    >Delete</button>
                    <button
                        onClick={() => props.onClick()}
                        type="submit"
                        id="canclebtn"
                    >Cancel</button>

                </div>
            </form>
        </div>
    )

}
//TODO - blir ikke updated før man refresher siden