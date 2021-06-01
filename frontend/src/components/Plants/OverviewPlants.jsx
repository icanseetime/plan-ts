import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Switch, Route, Link } from 'react-router-dom';

// CSS
import './Overview.css'
import './MainPlant.css'
import './SinglePlant.css'

// Authentication
import { AuthContext } from '../../utils/context'

// Components
import AllPlants from './AllPlants'
import Search from './Forms/Search'

// Overview component that puts together search and all plants.
export default function Overview() {
    const [plantsDEFAULT, setPlantsDEFAULT] = useState('')
    const [plants, setPlants] = useState('')
    const [buildings, setBuildings] = useState([])
    const [locations, setLocations] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const authContext = useContext(AuthContext)

    useEffect(() => {
        getAllPlants()
        getBuildings()
        getLocations()
    }, []) // [] Necesarry so the code do not run in an infinite loop, tells it to only run on render

    // API Call | Get all locations (buildings)
    const getBuildings = () => {
        axios.get('/api/locations/buildings')
            .then((res) => {
                setBuildings(res.data)
            })
            .catch((err) => console.log('Error! ', err))
    }

    // API Call | Get all locations
    const getLocations = () => {
        axios.get('/api/locations')
            .then((res) => {
                setLocations(res.data)
            })
            .catch((err) => console.log('Error! ', err))
    }

    // API Call | Get all plants - On load -> load all plants in db
    const getAllPlants = (searchValue) => {
        let search = ''
        if (searchValue != '' && searchValue != undefined) search = `/search?searchField=${searchValue}`
        else if (searchValue == '') search = ''

        axios.get(`/api/plants${search}`)
            .then((res) => {
                const allPlants = res.data
                setPlants(allPlants)
                setPlantsDEFAULT(allPlants)
                if (filterValue !== '') getAllPlantsInBuilding()
            })
            .catch((error) => {
                console.error(`Error | ${error}`)
            })
    }

    // Get all plants - On filter -> load all plants in x building WIP
    const getAllPlantsInBuilding = () => {
        if (filterValue === '') {
            setPlants(plantsDEFAULT)
        } else {
            let filteredPlants = plantsDEFAULT.filter(
                (plant) => plant.location.building.no == filterValue
            )
            setPlants(filteredPlants)
        }
    }

    useEffect(() => {
        getAllPlantsInBuilding()
    }, [filterValue, searchValue])

    return (
        <div>
            <Switch>
                <Route to="/plants/overview" exact>
                    <h1>Plants Overview</h1>
                    <div className="topOfOverviewPlants">
                        <Search
                            getAllPlants={getAllPlants}
                            searchValue={searchValue}
                            filterValue={filterValue}
                            setSearchValue={(v) => setSearchValue(v)}
                            setFilterValue={(v) => setFilterValue(v)}
                            plants={plants}
                            buildings={buildings}
                            locations={locations}
                        />
                        {authContext.role === 'manager' && (
                            <div className="addPlant">
                            <Link
                                to="/plantsnew"
                                className="btn"
                            >Add new plant</Link>
                            </div>
                        )}
                    </div>
                    <AllPlants
                        plants={plants}
                        locations={locations}
                    />
                </Route>
            </Switch>
        </div>
    )
}
