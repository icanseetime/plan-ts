import { Link } from 'react-router-dom';
import React from 'react';
import './Feedback.css'
import AllFeedback from './AllFeedback';

export default function Feedback() {
    return (
        <div>
            <h1>Feedback</h1>
            <div className="feedback">
                <AllFeedback />
            </div>
        </div>
    )
}
