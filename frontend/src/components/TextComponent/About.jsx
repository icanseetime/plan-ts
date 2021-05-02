import React from 'react'
import './Text.css'

export default function About() {
    return (
        <div id="aboutcontainer">
            <h1 id="about">About</h1>
            <div className="textcontainer">
                <div className="textfield">
                    <h2>Plan-ts</h2>
                    <p>
                        Plan-ts is an website created for the department of
                        design at NTNU.
                    </p>
                    <p>
                        Its purpose is to keep track of the plants on campus,
                        giving its users information- such as when to water a
                        certain plant.
                    </p>
                    <p>
                        From now on the plants will live a long and happy life,
                        because its much easier to take care of them:)
                    </p>
                </div>
                <div className="textfield">
                    <h2>The people behind the project</h2>
                    <p>We are three BWU students, in our second year.</p>
                    <p>
                        Ida worked on the backend, while Vilde and Lena worked
                        on the frontend
                    </p>
                </div>
            </div>
        </div>
    )
}
