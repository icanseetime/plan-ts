import React, { useState } from 'react'
import '../Overview.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Search(props) {
    const handleSearch = (e) => {
        props.setSearchValue(e.target.value)
        props.getAllPlants(e.target.value)
    }

    return (
        // Search after plant name
        <form className="search" onSubmit={(e) => e.preventDefault()}>
            <div className="inputs searchInpContainer">
            <h3>Search for plant name</h3>
                <div className="inputcontainer">
                    <input
                        className="searchInp"
                        value={props.searchValue}
                        onChange={(e) => {
                            handleSearch(e)
                        }}
                        type="text"
                        placeholder="Search..."
                    />
                    <FontAwesomeIcon
                        icon={['fas', 'search']}
                        className="searchicon"
                    />
                </div>
            </div>

            {/* Filter plants */}
                <div className="inputs">
                    <h3>Select building</h3>
                    <div className="inputcontainer filterBuildings">
                        <select onChange={(e) => { props.setFilterValue(e.target.value) }}>
                            <option value="" defaultValue> All Buildings </option>
                            {props.buildings.map((building, i) => {
                                return (
                                    <option
                                        type="radio"
                                        name="buildSelect"
                                        value={building.no}
                                        key={building.no}
                                    >{building.name}</option>
                            )})}
                        </select>
                    </div>
                </div>
        </form>
    )
}
