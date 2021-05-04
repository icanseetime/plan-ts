import { useState } from 'react';

export default function Slider(props) {

    const [water, setWater] = useState('')
    const [fertalizer, setFertalizer] = useState('')
    const [light, setLight] = useState('')

    const handleWater = (e) => {
        props.setWaterAmount(e.target.value)
        setWater(e.target.value)
    }

    const handleFertaizer = (e) => {
        props.setFertilizerAmount(e.target.value)
        setFertalizer(e.target.value)
    }

    const handleLight = (e) => {
        props.setLightAmount(e.target.value)
        setLight(e.target.value)
    }

    return (
        <div className="slidersContainer">
            <label className="addNeed">
                <span>Set the needs of the plant</span>
            </label>
            Water (1-3):{' '}
            <input
                className="watrSlide"
                type="range"
                value={water}
                onChange={handleWater}
                min={1}
                max={3}
            ></input>
            Fertilizer (1-3):{' '}
            <input
                className="fertSlider"
                type="range"
                value={fertalizer}
                onChange={handleFertaizer}
                min={1}
                max={3}
            ></input>
            Sunlight (1-5):{' '}
            <input
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