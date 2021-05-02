import { useState} from 'react';

function Slider(props) {

const [water, setWater] = useState('')
const [fertalizer, setFertalizer] = useState('')
const [light, setLight] = useState('')

const handleWater = (e) => {
    setWater(e.target.value)
    console.log(e.target.value)
}

    const handleFertaizer = (e) => {
        setFertalizer(e.target.value)
        console.log(e.target.value)
}

const handleLight = (e) => {
    setLight(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className="slidersContainer">
            <label className="addNeed"><span>Set the needs of the plant:</span></label>
                        Water(1-3): <input className="watrSlide" type="range" value={water} onChange={handleWater} min={1} max={3}></input>
                        Fertalizer(1-3): <input className="fertSlider" type="range" value={fertalizer} onChange={handleFertaizer}  min={1} max={3}></input>
                        Sunlight(1-5): <input className="light" type="range" value={light} onChange={handleLight} min={1} max={5}></input>
        </div>
    );
}

export default Slider;