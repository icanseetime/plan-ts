import React, { useState } from 'react';

export default function Password(props) {
    const [iscorrect, setIscorrect] = useState(props.repeatPass? false : true);
    const [returnValid, setReturnValid] = useState(false)

    const handleChange = (e, type) => {
        if(props.repeatPass === true) {
            props.password === e.target.value ? setIscorrect(true) : setIscorrect(false);
            type || props.onChange(e.target.value); 
            if(iscorrect === true) {
                setReturnValid(true); 
            } else if (iscorrect === false) {
                setReturnValid(false); 
            }        
            props.confirmRepeat(returnValid)

        } else if(!props.repeatPass){  
            type || props.onChange(e.target.value);
        }

    }

    return (
        <div className="singleInput">
            <label> Password: </label>
            <div className="inputcontainer">
                <input
                    value={props.email}
                    onChange={e => handleChange(e, false)} 
                    placeholder="********"
                    type="password"
                    name="password"
                    required
                />
            </div>
            { props.repeatPass &&
                <div className="singleInput">
                    <label> Repeat Password: </label>

                    <div className="inputcontainer">
                        <input
                            onChange={(e) => handleChange(e, true) }
                            placeholder="********"
                            type="password"
                            name="passwordrepeat"
                            confirmRepeat={() => props.confirmRepeat(returnValid)}
                            required
                        />
                    </div>
                    <h4>Passwords {iscorrect ? 'match' : 'do not match'}.</h4>
                </div>
            }
        </div>
    )
}