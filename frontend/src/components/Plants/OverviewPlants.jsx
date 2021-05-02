// Component that takes an array and prints <PlantOverview id='someId' /> for every item. //this is the PARENT COMPONENT  FOR PLANTS

import React, { useState, useEffect, useContext } from 'react';
import './Overview.css';
import { AuthContext } from '../../utils/context';
import axios from 'axios';
import AllPlants from './AllPlants';
import Search from './Forms/Search'
import AddPlant from './Forms/AddPlant';
import Plant from './Plant';

export default function Overview() {
    const [plantsDEFAULT, setPlantsDEFAULT] = useState('');
    const [plants, setPlants] = useState('');
    const [plant, setPlant] = useState({});
    const [buildings, setBuildings] = useState([]);
    const [locations, setLocations] = useState([]);
    //const [locationOnePlant, setLocationOnePlant] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const [isAdding, setIsAdding] = useState(false);
    const [singlePlantView, setSinglePlantView] = useState(false)
    const authContext = useContext(AuthContext);

    useEffect(() => {
        getAllPlants();
        getBuildings();
        getLocations();
    }, []); // [] Necesarry so the code do not run in an infinite loop, tells it to only run on render

    // API Call | Get all locations (buildings)
    const getBuildings = () => {
        axios.get('/api/locations/buildings')
            .then(res => {
                setBuildings(res.data);
            })
            .catch(err => console.log('Error! ', err))
    };

    // API Call | Get all locations
    const getLocations = () => {
        axios.get('/api/locations')
            .then(res => {
                setLocations(res.data);
            })
            .catch(err => console.log('Error! ', err))
    };

    // API Call | Get all plants - On load -> load all plants in db
    const getAllPlants =  (searchValue) => {
        let search = ''; 
        console.log(searchValue)
        console.log(searchValue != '' && searchValue != undefined)
        if(searchValue != '' && searchValue != undefined) search =  `/search?searchField=${searchValue}`;
        else if (searchValue == '') search = '';
        console.log(search)

        axios.get(`/api/plants${search}`)
            .then( (res) => {
                const allPlants = res.data 
                setPlants(allPlants)
                setPlantsDEFAULT(allPlants)
                console.log(filterValue !== '')
                console.log('Before filter, after search, DEFAULT: ', plantsDEFAULT)
                if(filterValue !== '') getAllPlantsInBuilding();
            })
            .catch(error => {
                console.error(`Error from plant overview: ${error}`)
            })
    }

    // Get all plants - On filter -> load all plants in x building WIP
    const getAllPlantsInBuilding = () => {
        console.log('default ',plantsDEFAULT)
                console.log('plants ',plants)
        if(filterValue === '') {
            setPlants(plantsDEFAULT);
        } else {
            let filteredPlants = plantsDEFAULT.filter(plant => plant.location.building.no == filterValue ) //gir warning på == men d må vær d funke ikke med === eller = lol
            console.log('Filtered: ',filteredPlants)
            setPlants(filteredPlants)
        }
    }

    useEffect(()=> {
        console.log(filterValue)
            getAllPlantsInBuilding();
    }, [filterValue])

    // API Call | Get one plant
    const getOnePlant = async (plantId) => {
        await axios.get(`/api/plants/${plantId}`)
            .then((res) => {
                //console.log(res.data);
                setPlant(res.data);
                setSinglePlantView(true);
            })

            .catch(err => {
                console.log('Error | ', err)
            })
    }

    
    return (
        <div className="viewPlants">
            {singlePlantView ? (
                <div>
                    <Plant 
                        plant={plant} 
                        locations={locations} 
                        onClick={() => setSinglePlantView(false)} 
                    />
                </div>
            ) : (
                <div>
                    <h1>Plants Overview</h1>
                    {/* Make auth stuff happen here */}
                        {isAdding ? (
                        <AddPlant 
                            setIsAdding={setIsAdding} 
                            locations={locations} 
                            buildings={buildings} 
                        />
                    ) : (
                        <div>  
                            <div id="topPlant">                          
                            <Search 
                                getAllPlants={getAllPlants}
                                searchValue={searchValue} 
                                filterValue={filterValue} 
                                setSearchValue={(v) =>setSearchValue(v)} 
                                setFilterValue={(v) =>setFilterValue(v)} 
                                plants={plants} 
                                buildings={buildings} 
                                locations={locations} 
                                />
                            { authContext.role === 'manager' && (
                                <button className="btn addPlantBtn" onClick={setIsAdding}>Add new plant</button>
                            )}
                            </div>
                            {plantsDEFAULT ? (
                                <AllPlants 
                                    plants={plants} 
                                    setIsAdding={setIsAdding} 
                                    getOnePlant={getOnePlant} 
                                    locations={locations} />
                            ): (
                                <p className="loading">Loading...</p>
                            )}
                        </div>
                    )}
                </div>)}
        </div>
    ) 

    // Water plant in 5 days => get x days from due date from db - today's date, then turn into an int which will be amount of days.
}