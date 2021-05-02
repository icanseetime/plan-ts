import React, { useState, useEffect } from 'react';
import './Feedback.css'
import AllFeedback from './AllFeedback';

export default function Feedback() {
    return (
        <div className="feedback">
            <h1>Feedback</h1>
            <AllFeedback />
        </div>
    )
}
