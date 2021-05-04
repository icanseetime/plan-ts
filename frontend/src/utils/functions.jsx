export const ChangeTime = (timestamp) => {
    timestamp = new Date(timestamp)
    let date = new Intl.DateTimeFormat('no-NO', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp) 
    //hour: '2-digit', minute: '2-digit', second: '2-digit' - om vi vil ha klokkeslett å   
    return date
}
export const WaterSlider = (data) => {
    return (<div className="sliderContainer">
        <input className="watrSlide" type="range" readOnly value={data} min={1} max={3}></input>
        <img className="iconLeft" src="/assets/healthslider/drop.png" alt="Icon for water level - min water" />
        <img className="iconRight" src="/assets/healthslider/drops.png" alt="Icon for water level - max water" />
    </div>)
}
export const FertSlider = (data) => {
    return (
        <div className="sliderContainer">
            <input className="fertSlider" type="range" readOnly value={data} min={1} max={3}></input>
            <img className="iconLeft" src="/assets/healthslider/lilfertil.png" alt="Icon for fertalizing level - no fertalizing" />
            <img className="iconRight" src="/assets/healthslider/lotsfertil.png" alt="Icon for fertalizing level - max fertalizing" />
        </div>
    )
}
export const SunSlider = (data) => {
    return (
        <div className="sliderContainer">
            <input className="light" type="range" readOnly value={data} min={1} max={5}></input>
            <img className="iconLeft" src="/assets/healthslider/nosun.png" alt="Icon for sun level - no sun" />
            <img className="iconRight" src="/assets/healthslider/sun.png" alt="Icon for sun level - full sun" />
        </div>
    )
} 

export const calcDaysRemaining = (date) => {
    // Math.round(Math.abs((firstDate - secondDate) / oneDay));
    const oneDay = 24 * 60 * 60 * 1000; // Hours * min * sec * millisec 

    const today = new Date(Date.now());
    const dueDay = new Date(date);

    let result; // TODO fix this shit : ) 
        
    if(today <= dueDay) {
        result = Math.round(Math.abs((today - dueDay) / oneDay)) // Find days remaining
        return result;
    } else if(today > dueDay) {
        result = 0 // Return 0 if due date is TODAY or OVERDUE
        return result;
    }
}

export function decodeJWT(token) {
    let payload = token.split('.')[1]
    let base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )
    return JSON.parse(jsonPayload)
}
