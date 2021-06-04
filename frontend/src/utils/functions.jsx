export const ChangeTime = (timestamp) => {
    timestamp = new Date(timestamp)
    let date = new Intl.DateTimeFormat('no-NO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(timestamp)
    return date
}
export const WaterSlider = (data) => {
    return (
        <div className="sliderContainer">
            <label htmlFor="watrSlide" className="labelForSlider">
                Water
            </label>
            <div>
                <img
                    className="iconLeft"
                    src="/assets/healthslider/drop.png"
                    alt="Icon for water level - min water"
                />
                <input
                    disabled
                    name="watrSlide"
                    className="watrSlide"
                    type="range"
                    readOnly
                    value={data}
                    min={1}
                    max={3}
                ></input>
                <img
                    className="iconRight"
                    src="/assets/healthslider/drops.png"
                    alt="Icon for water level - max water"
                />
            </div>
        </div>
    )
}
export const FertSlider = (data) => {
    return (
        <div className="sliderContainer">
            <label htmlFor="fertSlider" className="labelForSlider">
                Fertilizer
            </label>
            <div>
                <img
                    className="iconLeft"
                    src="/assets/healthslider/lilfertil.png"
                    alt="Icon for fertalizing level - no fertalizing"
                />
                <input
                    disabled
                    name="fertSlider"
                    className="fertSlider"
                    type="range"
                    readOnly
                    value={data}
                    min={1}
                    max={3}
                ></input>
                <img
                    className="iconRight"
                    src="/assets/healthslider/lotsfertil.png"
                    alt="Icon for fertalizing level - max fertalizing"
                />
            </div>
        </div>
    )
}
export const SunSlider = (data) => {
    return (
        <div className="sliderContainer">
            <label htmlFor="light" className="labelForSlider">
                Sunlight
            </label>
            <div>
                <img
                    className="iconLeft"
                    src="/assets/healthslider/nosun.png"
                    alt="Icon for sun level - no sun"
                />
                <input
                    disabled
                    name="light"
                    className="light"
                    type="range"
                    readOnly
                    value={data}
                    min={1}
                    max={5}
                ></input>
                <img
                    className="iconRight"
                    src="/assets/healthslider/sun.png"
                    alt="Icon for sun level - full sun"
                />
            </div>
        </div>
    )
}

export const calcDaysRemaining = (date) => {
    const oneDay = 24 * 60 * 60 * 1000 // Hours * min * sec * millisec

    const today = new Date(Date.now())
    const dueDay = new Date(date)

    let result

    if (today <= dueDay) {
        result = Math.round(Math.abs((today - dueDay) / oneDay)) // Find days remaining
        return result
    } else if (today > dueDay) {
        result = 0 // Return 0 if due date is TODAY or OVERDUE
        return result
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
