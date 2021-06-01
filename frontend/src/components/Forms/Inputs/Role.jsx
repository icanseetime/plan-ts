import React from 'react'

export default function Role(props) {
    return (
        <div className="singleInput">
            <label> Role: </label>
            <div className="inputcontainer">
                <select
                    value={props.role}
                    onChange={(e) => props.onChange(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        --Choose a role--
                    </option>
                    <option value="gardener">Gardener</option>
                    <option value="manager">Manager</option>
                </select>
            </div>
        </div>
    )
}
