import React from 'react'
import { Link } from 'react-router-dom'
import {
    WaterSlider,
    FertSlider,
    SunSlider,
    calcDaysRemaining
} from '../../utils/functions.jsx'

// CSS
import './Overview.css'

export default function Plant(props) {
    const displayPlants = (props) => {
        const plants = props.plants
        if (plants.length > 0) {
            return plants.map((plant, i) => {
                let waterDue = calcDaysRemaining(plant.health.water.due)
                let fertDue = calcDaysRemaining(plant.health.fertilizer.due)
                return (
                    <div className="plant" key={plant._id}>
                        <div className="gridBox">
                            <div className="dueslide">
                                <div className="duedate">
                                    <h1 className="plantName">
                                        {' '}
                                        {plant.name}{' '}
                                    </h1>
                                    {waterDue >= 1 ? (
                                        <p className="watr">
                                            {' '}
                                            Water the plant in{' '}
                                            <span>{waterDue}</span> day
                                            {waterDue !== 1 ? 's' : ''}!{' '}
                                        </p>
                                    ) : (
                                        <p className="watr">
                                            {' '}
                                            Water the plant <span>
                                                today
                                            </span>!{' '}
                                        </p>
                                    )}
                                    {fertDue >= 1 ? (
                                        <p className="watr">
                                            {' '}
                                            Fertilize the plant in{' '}
                                            <span>{fertDue}</span> day
                                            {fertDue !== 1 ? 's' : ''}!{' '}
                                        </p>
                                    ) : (
                                        <p className="watr">
                                            {' '}
                                            Fertilize the plant{' '}
                                            <span>today</span>!{' '}
                                        </p>
                                    )}
                                </div>
                                <div className="Slider">
                                    <h2>Plant needs:</h2>
                                    {WaterSlider(plant.health.water.amount)}
                                    {FertSlider(plant.health.fertilizer.amount)}
                                    {SunSlider(plant.health.light.amount)}
                                </div>
                            </div>
                            <div className="imgLoc">
                                <div className="cover">
                                    <img
                                        src={`/assets/uploaded-plants/${plant.picture}`}
                                        alt={
                                            plant.picture !== 'no-image.png'
                                                ? `Image of ${plant.name}`
                                                : 'No image provided'
                                        }
                                    />
                                </div>
                                <div className="location">
                                    <h2>Location</h2>
                                    <p>
                                        Building: {plant.location.building.name}
                                    </p>
                                    <p>Floor: {plant.location.floor}</p>
                                    <p>Room: {plant.location.room}</p>
                                </div>
                            </div>
                        </div>
                        <Link
                            className="viewbtn"
                            to={{
                                pathname: `/plants/${plant._id}`,
                                state: { _id: plant._id }
                            }}
                        >
                            View plant
                        </Link>
                    </div>
                )
            })
        } else {
            return <p className="loading">Loading...</p>
        }
    }
    return (
        <div>
            <div className="plantsContainer">{displayPlants(props)}</div>
        </div>
    )
}
