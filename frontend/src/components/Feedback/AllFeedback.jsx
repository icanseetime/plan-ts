import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ChangeTime } from '../../utils/functions'

export default function Feedback() {
    const [feedback, setFeedback] = useState([]);

    //GET TOKEN
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    // DELETE A MESSAGE
    const deleteFeedback = (_id) => {
        setFeedback(feedback.filter((message) => message._id !== _id))
        axios.delete(`/api/feedback/${_id}`, { headers })
            .then(res => {
                alert('Feedback Deleted')
            })
            .catch(err => {
                console.log('Error | ', err)
            })
    }

    const getAllFeedback = () => {
        axios.get('/api/feedback', { headers })
            .then( res => {
                setFeedback(res.data)
                    
            })
            .catch(err => console.log(err))
    }

    

    useEffect(() => {
        getAllFeedback();
    }, [])


    if (feedback.length > 0) {
        
        return (
            feedback.map((message, index) => {
                return (
                    <div className="letter" key={message._id}>
                        <h3 className="sender">{message.name}</h3>
                        <div className="textField">
                            <p>{message.message_body}</p>
                             <p>Regarding "{message.plant_id.name}"</p> 
                            <h4>Message sent at {ChangeTime(message.createdAt)}</h4>
                        </div>
                        <div className="btnContainer">
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




