import { useState } from 'react';

export default function Slider(props) {

    // For EditPlant - Set existing values if they exist.
    let slidervalues; 
    slidervalues = props.slidervalues ? props.slidervalues : null;
    const [water, setWater] = useState(slidervalues ? slidervalues.water : '')
    const [fertilizer, FertilizerAmount] = useState(slidervalues ? slidervalues.fertilizer : '')
    const [light, setLight] = useState(slidervalues ? slidervalues.light : '')

    const handleWater = (e) => {
        props.setWaterAmount(e.target.value)
        setWater(e.target.value)
    }

    const handleFertilizerAmount = (e) => {
        props.setFertilizerAmount(e.target.value)
        FertilizerAmount(e.target.value)
    }

    const handleLight = (e) => {
        props.setLightAmount(e.target.value)
        setLight(e.target.value)
    }

    return (
        <div className="slidersContainer">
                <h3>Set the needs of the plant</h3>
            <label htmlFor="watrSlide">Water (1-3):</label>
            <input
                className="watrSlide"
                name='waterSlider'
                type="range"
                value={water}
                onChange={handleWater}
                min={1}
                max={3}
            ></input>
            <label htmlFor="fertilizerSlider">Fertilizer (1-3):</label>
            <input
                name='fertilizerSlider'
                className="fertSlider"
                type="range"
                value={fertilizer}
                onChange={handleFertilizerAmount}
                min={1}
                max={3}
            ></input>
            <label htmlFor="lightSlider">Sunlight (1-5):</label>
            <input
                name='lightSlider'
                className="light"
                type="range"
                value={light}
                onChange={handleLight}
                min={1}
                max={5}
            ></input>
        </div>
    )
}