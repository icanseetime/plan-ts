import React from 'react';
import './Text.css'


function Help() {
    return (
        <div>
            <h1>Help</h1>
            <div className="textFieldContainer">
                <div className="textcontainer">
                    <div className="textfield">
                        <h2>How-to-use</h2>
                        <h3 className="helpHeading">Register</h3>
                        <ol>
                            <li>
                                A manager on this website will need to invite you
                                into the system and choose your role
                        </li>
                            <li>
                                You will get an email with a link to a page where
                                you can register your user info
                        </li>
                            <li>
                                After you have registered, you can log in with your
                                email and password
                        </li>
                        </ol>
                        <h3 className="helpHeading">Role system</h3>
                        <ul>
                            <li>
                                To login to this website you need to be invited as
                                one of two roles: Gardener or Manager
                        </li>
                            <li>
                                If your not logged in (Guest user) you can still see
                                an overview of all the plants on campus
                        </li>
                        </ul>
                    </div>
                    <div className="textfield">
                        <h2>Functionality</h2>
                        <h3 className="helpHeading">Gardeners</h3>
                        <ul>
                            <li>
                                After you have watered a plant you need to click the
                            "Watered" button on the page of that plant.{' '}
                            </li>
                            <li>
                                After you have fertilized a plant you need to click
                            the "Fertilized" button on the page of that plant.{' '}
                            </li>
                            <li>
                                You can also click the "complete task" button under
                                the corresponding plant on the "Tasks" page. This is
                                how you notify the manager that you have done the
                                task
                        </li>
                        </ul>
                        <h3 className="helpHeading">Managers</h3>
                        <ul>
                            <li>Can add and delete plants and users </li>
                            <li>
                                You set the watering schedule of a plant when you
                                add it to the system. It can be changed later
                                through the update plant feature.
                        </li>
                            <li>
                                When you add a plant, you need to set the need of
                                the plant. For water and fertilizing it goes from
                                1-3, and for sunlight from 1-5.
                        </li>
                        </ul>
                    </div>
                </div>
                <div id="plantNeeds">
                    <h2 className="helpHeading">Plant needs</h2>
                    <div className="plantNeedHelpContainer">
                        <div className="plantNeedBox">
                            <h4 className="helpHeading">Water</h4>
                            <ol>
                                <li>A little water </li>
                                <li> Medium amount of water </li>
                                <li> Plenty of water</li>
                            </ol>
                        </div>
                        <div className="plantNeedBox">
                            <h3 className="helpHeading">Fertilizer</h3>
                            <ol>
                                <li>A little fertilizer </li>
                                <li> Medium amount of fertilizer </li>
                                <li> Plenty of fertilizer</li>
                            </ol>
                        </div>
                        <div className="plantNeedBox">
                            <h3 className="helpHeading">Sunlight</h3>
                            <ol>
                                <li>Low light (shade) </li>
                                <li>Indirect light (half-shade)</li>
                                <li>Medium light </li>
                                <li> Bright indirect light </li>
                                <li>Direct light</li>
                            </ol>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Help;