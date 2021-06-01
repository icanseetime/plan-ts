import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ChangeTime } from '../../utils/functions'

export default function Feedback() {
    const [feedback, setFeedback] = useState();

    //GET TOKEN
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    // API Call || Delete feedback message
    const deleteFeedback = (_id) => {
        let confirm = window.confirm("Delete feedback?");
        if (confirm === true) {
            setFeedback(feedback.filter((message) => message._id !== _id))
            axios.delete(`/api/feedback/${_id}`, { headers })
                .then(res => {
                    alert('Feedback Deleted')
                })
                .catch(err => {
                    console.log('Error | ', err)
                })
        }
    }

    // API Call || Get all feedback
    const getAllFeedback = () => {
        axios.get('/api/feedback', { headers })
            .then(res => {
                setFeedback(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllFeedback();
    }, [])

    if (feedback && feedback.length > 0) {
        return (
            feedback.map((message, index) => {
                if (message.plant_id === null) return '' // Messages regarding non-existing plants will not show.
                return (
                    <div className="letter" key={message._id}>
                        <h3 className="sender">{message.name}</h3>
                        <div className="textField">
                            <p>{message.message_body}</p>
                            <p>Regarding <em>{message.plant_id.name}</em></p>
                            <h4>Message sent at {ChangeTime(message.createdAt)}</h4>
                        </div>
                        <div>
                            <button
                                onClick={() => deleteFeedback(message._id)}
                                className="delbtn delbtnMSG"
                            >Delete</button>
                        </div>
                    </div>
                )
            }
            ))
    } else { return <h3 id="noMsg">No Feedback</h3> }
}




