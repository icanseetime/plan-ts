import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

// Components
import Slider from '../Slider'

export default function EditPlant(props) {
    const path = require('path')
    const plant = props.plant

    // Relocate
    const [willRelocate, setWillRelocate] = useState(false)

    // General Inputs
    const [plantName, setPlantName] = useState(plant.name)
    const [plantNotes, setPlantNotes] = useState('')
    const [daysBetweenWtr, setDaysbetweenWtr] = useState(
        plant.health.water.days_between
    )
    const [daysBetweenFrt, setDaysbetweenFrt] = useState(
        plant.health.fertilizer.days_between
    )
    const [waterAmount, setWaterAmount] = useState(plant.health.water.amount)
    const [fertilizerAmount, setFertilizerAmount] = useState(
        plant.health.fertilizer.amount
    )
    const [lightAmount, setLightAmount] = useState(plant.health.light.amount)

    // Image File
    const [file, setFile] = useState('')
    const [err, setErr] = useState({ isErr: false, typemsg: '', sizemsg: '' })

    //GET TOKEN
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` } // Just in case :P

    // Get plant's notes
    const getNotes = () => {
        if (props.plant !== undefined) {
            axios
                .get(`/api/plants/${plant._id}/notes`, { headers })
                .then((res) => setPlantNotes(res.data.notes))
                .catch((err) => console.log('Error with notes | ', err))
        } else {
            setPlantNotes('Loading notes...')
        }
    }

    useEffect(() => {
        getNotes()
    }, [])

    // API Call | Delete plant
    const deletePlant = async () => {
        let confirm = window.confirm(
            'Are you sure you want to delete this plant?'
        )
        if (confirm === true) {
            let id = plant._id
            axios
                .delete(`/api/plants/${id}`, { headers })
                .then((res) => {
                    alert(`"${plant.name}" successfully deleted.`)
                    setWillRelocate(true)
                })
                .catch((err) => {
                    console.log('Error | ', err)
                })
        }
    }

    // Image file handling
    const onPicChange = (e) => {
        // Type
        let fileType = path.extname(e.target.files[0].name)
        let validFileType = false

        // Size
        let filesize = e.target.files[0].size
        let filesizeMB = Math.round(filesize / 1024 / 1024)

        // Check type
        switch (fileType) {
            case '.jpg':
                validFileType = true
                setErr({ isErr: false, typemsg: '' })
                break
            case '.jpeg':
                validFileType = true
                setErr({ isErr: false, typemsg: '' })
                break
            case '.png':
                validFileType = true
                setErr({ isErr: false, typemsg: '' })
                break
            default:
                setErr({
                    isErr: true,
                    typemsg: 'Not a valid filetype. Please use JPG or PNG.'
                })
                break
        }

        // Check size
        if (filesizeMB >= 5) {
            setErr({ isErr: true, sizemsg: 'File too large' })
        } else if (filesizeMB <= 5 && validFileType === true) {
            setFile(e.target.files[0])
            setErr({ isErr: false, sizemsg: '' })
        }
    }

    // API Call || Upload image
    const onSubmit = async (e) => {
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
                    const { filename } = res.data
                    await editPlant(e, filename)
                } catch (err) {
                    if (err.response.status === 500) {
                        console.log('Server error', err.response.data.error)
                    } else {
                        console.log(err.response.data.error)
                    }
                }
            }
        } else {
            editPlant(e)
        }
    }

    // API Call | Edit plant
    const editPlant = (e, imgurl) => {
        e.preventDefault()
        let confirm = window.confirm('Save new plant details?')
        if (confirm === true) {
            let data = {
                name: plantName,
                notes: plantNotes,
                waterDaysBetween: daysBetweenWtr,
                fertilizerDaysBetween: daysBetweenFrt,
                fertilizerAmount: fertilizerAmount,
                waterAmount: waterAmount,
                lightAmount: lightAmount
            }
            if (imgurl) {
                data.picture = imgurl
            }

            axios
                .put(`/api/plants/${plant._id}`, data, { headers })
                .then((res) => {
                    alert('Successfully updated ', props.plant.name)
                    props.onClick()
                    window.location.reload()
                })
                .catch((err) => {
                    console.log('Error | ', err)
                })
        }
        axios.put(`/api/plants/${plant._id}`, data, { headers })
            .then(res => {
                alert("Successfully updated ", props.plant.name)
                props.onClick()
                window.location.reload()
            })
            .catch(err => {
                console.log("Error | ", err)
            })
    }

    //// RENDER ////
    if (willRelocate === true) return <Redirect to="/plantsoverview" />
    return (
        <div className="inputs">
            <h1>Edit plant</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="plantForms">
                    <div>
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
                                    onChange={onPicChange}
                                />
                                <p className="err">
                                    {err.isErr && err.typemsg && err.typemsg}
                                </p>
                                <p className="err">
                                    {err.isErr && err.sizemsg && err.sizemsg}
                                </p>
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
                                    min="1"
                                    max="365"
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
                                    min="1"
                                    max="365"
                                    value={daysBetweenFrt}
                                    onChange={(e) =>
                                        setDaysbetweenFrt(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="plantNeeds">
                            <Slider
                                slidervalues={{
                                    water: plant.health.water.amount,
                                    fertilizer: plant.health.fertilizer.amount,
                                    light: plant.health.light.amount
                                }}
                                setWaterAmount={(v) => setWaterAmount(v)}
                                setFertilizerAmount={(v) =>
                                    setFertilizerAmount(v)
                                }
                                setLightAmount={(v) => setLightAmount(v)}
                            />
                        </div>
                        <label>
                            <span>Plant Notes</span>
                        </label>
                        <div className="inputcontainer">
                            <textarea
                                value={plantNotes}
                                onChange={(e) => setPlantNotes(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div id="formButtons">
                    <button type="submit" className="btn">
                        Update Plant
                    </button>
                    <button
                        onClick={() => deletePlant()}
                        type="button"
                        className="btn"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => props.onClick()}
                        type="submit"
                        className="btn"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
