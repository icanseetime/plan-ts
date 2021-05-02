import React, { useState } from 'react';

import Name from '../Forms/Inputs/Name';

export default function NewFeedback(props) {
    const [anonName, setAnonName] = useState('')
    const [messageBody, setMessageBody] = useState('')


    //api call TODO: E herren å den andre feedback greia som har memory leak warningen
    

    return (
        <form
            onSubmit={() => props.onClick()}
        >
            <h4>Got feedback? Please tell us!</h4>
            <div className="inputs">
            <Name onChange={(value) => setAnonName(value)} />
            <div className="singleInput">
                <label>Feedback:</label>
                <textarea onChange={(e) => setMessageBody(e.target.value)} value={messageBody} name="message_body" id="msgBdy" cols="30" rows="7" required></textarea>
            </div></div>
            <button type="submit" className="btn">Send</button>
            <button type="button" onClick={() => props.onClick()} className="btn">Cancel</button>
        </form>
    )
}