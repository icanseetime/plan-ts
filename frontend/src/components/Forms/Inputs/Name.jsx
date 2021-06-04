import React from 'react'

export default function Name(props) {
    return (
        <div className="singleInput">
            <label> Name: </label>
            <div className="inputcontainer">
                <input
                    value={props.name}
                    onChange={(e) => props.onChange(e.target.value)}
                    placeholder="Jon Doe"
                    type="text"
                    name="name"
                    required
                />
            </div>
        </div>
    )
}
