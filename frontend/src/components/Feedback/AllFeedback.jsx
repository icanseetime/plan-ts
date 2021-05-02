import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Feedback(props) {
    const [feedback, setFeedback] = useState([]);

    //GET TOKEN
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` }

    // DELETE A MESSAGE
    const deleteFeedback = (_id) => {
        setFeedback(feedback.filter((message) => message._id !== _id))
        axios.delete(`/api/feedback/${_id}`, { headers })
            .then(res => {
                console.log('Feedback Deleted')
            })
            .catch(err => {
                console.log('Error | ', err)
            })
    }

    const getAllFeedback = () => {
        axios.get('/api/feedback', { headers })
            .then(res => {
                setFeedback(res.data)
            })
            .catch(err => console.log(err))
    }


    // const newFeedback = (plant_id) => {
    //     let data = {
    //         "name": props.anonName,
    //         "plant_id": plant_id,
    //         "message_body": props.messageBody
    //     }
    //     axios.post('/api/feedback', data)
    //         .then(res => {
    //            console.log(res.data)
    //         })
    //         .catch(err => console.log(err))
    // }

    //Temporary (Add api call later)
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
                            <hr />
                            <p>Regarding plant... (plant name/location? API call for plants?)</p>
                            <p>(temp | id {message._id})</p>
                        </div>
                        <div className="btnContainer">
                            <button onClick={() => deleteFeedback(message._id)} className="delbtn delbtnMSG">Delete</button>
                        </div>
                    </div>
                )
            }

            ))
    } else { return <h3 id="noMsg">No Feedback</h3> }

}




