// Goes through every plant from db and renders a styles list of them

import React from 'react';
import { WaterSlider, FertSlider, SunSlider, calcDaysRemaining } from '../../utils/functions.jsx';
import './Overview.css';

export default function Plant(props) {
    const displayPlants = (props) => {
        const plants = props.plants;

        if (plants.length > 0) {
            return (
                plants.map((plant, index) => {
                    let waterDue = calcDaysRemaining(plant.health.water.due)+1;
                    let fertDue = calcDaysRemaining(plant.health.fertilizer.due)+1;
                    return (
                        <div className="plant" key={plant._id}>
                            <div className="gridBox">
                                <div className="dueslide">
                                    <div className="duedate">
                                        <h1 className="plantName">
                                            {plant.name}{' '}
                                        </h1>
                                        {waterDue >= 1 ? (
                                            <p className="watr">
                                                Water the plant in{' '}
                                                <span>{waterDue}</span> day
                                                {waterDue !== 1 ? 's' : ''}!
                                            </p>
                                        ) : (
                                            <p className="watr">
                                                Water the plant today!
                                            </p>
                                        )}
                                        {fertDue >= 1 ? (
                                            <p className="watr">
                                                Fertilize the plant in{' '}
                                                <span>{fertDue}</span> day
                                                {fertDue !== 1 ? 's' : ''}!
                                            </p>
                                        ) : (
                                            <p className="watr">
                                                Fertilize the plant{' '}
                                                <span>today</span>!
                                            </p>
                                        )}
                                    </div>
                                    <div className="Slider">
                                        <h2>Plant needs:</h2>
                                        <h3>Water</h3>
                                        <div className="wtrImg">
                                            {WaterSlider(
                                                plant.health.water.amount
                                            )}{' '}
                                        </div>
                                        <h3>Fertilizer</h3>
                                        {FertSlider(
                                            plant.health.fertilizer.amount
                                        )}
                                        <h3>Sunlight</h3>
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
                                            Building:{' '}
                                            {plant.location.building.name}
                                        </p>
                                        <p>Floor: {plant.location.floor}</p>
                                        <p>Room: {plant.location.room}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="viewbtn"
                                onClick={() => props.getOnePlant(plant._id)}
                            >
                                View plant
                            </button>
                        </div>
                    )
                })
            )
        } else {
            return <h3>NO PLANTS FOUND</h3>
        }
    }
    return (
        <div>
            <div className="plantsContainer">
                {displayPlants(props)}
            </div>
        </div>
    )
}