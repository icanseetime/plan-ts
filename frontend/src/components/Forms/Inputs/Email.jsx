import React from 'react'

export default function Email(props) {
    return (
        <div className="singleInput">
            <label> Email: </label>
            <div className="inputcontainer">
                <input
                    value={props.email}
                    onChange={(e) => props.onChange(e.target.value)}
                    placeholder="example@email.com"
                    type="email"
                    name="email"
                    required
                />
            </div>
        </div>
    )
}
