import React, { useState } from 'react'
import '../Overview.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//this: searchbar, searchpage = overview. plantlist = liteplant
export default function Search(props) {
    const handleSearch = (e) => {
        props.setSearchValue(e.target.value)
        props.getAllPlants(e.target.value)
    }

    return (
        // Search after plant name
        <form className="search" onSubmit={(e) => e.preventDefault()}>
            <div className="inputs searchInpContainer">
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
            <div>
                <h3>Select building</h3>
                <select
                    onChange={(e) => {
                        props.setFilterValue(e.target.value)
                    }}
                >
                    <option value="" defaultValue>
                        All Buildings
                    </option>
                    {props.buildings.map((building, idex) => {
                        return (
                            <option
                                type="radio"
                                name="buildSelect"
                                value={building.no}
                                key={building.no}
                            >
                                {building.name}
                            </option>
                        )
                    })}
                </select>
            </div>
        </form>
    )
}
