import axios from 'axios'
import React, { useState } from 'react'

import Name from '../Forms/Inputs/Name'

export default function NewFeedback(props) {
    const [name, setName] = useState('')
    const [messageBody, setMessageBody] = useState('')

    //api call TODO: E herren å den andre feedback greia som har memory leak warningen
    const handleSubmit = (e) => {
        let confirm = window.confirm('Send feedback?')
        if (confirm === true) {
            e.preventDefault()

            let data = {
                name: name,
                plant_id: props.plant._id,
                message_body: messageBody
            }
            axios
                .post('/api/feedback', data)
                .then((res) => {
                    console.log(res.data)
                    props.onClick()
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} id="newFeedbackForm">
            <h4 id="new">Got feedback? Please tell us!</h4>
            <div className="inputs">
                <Name value={name} onChange={(value) => setName(value)} />
                <div className="singleInput">
                    <label>Feedback</label>
                    <div className="inputcontainer">
                        <textarea
                            onChange={(e) => setMessageBody(e.target.value)}
                            value={messageBody}
                            name="message_body"
                            id="msgBdy"
                            cols="30"
                            rows="7"
                            required
                        ></textarea>
                    </div>
                </div>
                <button type="submit" className="updatebtn">
                    {' '}
                    Send{' '}
                </button>
            </div>
            <button
                type="button"
                onClick={() => props.onClick()}
                className="updatebtn"
            >
                {' '}
                Cancel{' '}
            </button>
        </form>
    )
}
