import React from 'react';
import './Text.css'


function Help() {
    return (
        <div>
            <h1>Help</h1>

            <div className="textcontainer">
                <div className="textfield">
                    <h2>How-to-use</h2>
                    <h3>Register</h3>
                    <ol>
                        <li>The admin of this app needs to invite you throught email and chose your role</li>
                        <li>You will get an invite link that will take you to the register page</li>
                        <li>Register like normal</li>
                    </ol>
                    <h3>Role system</h3>
                    <ul>
                        <li>To login to this website you need to be invited as one of two roles: Gardener or Manager</li>
                        <li>If your not logged in (Guest user) you can still see an overview of all the plants on campus</li>
                    </ul>
                </div>
                <div className="textfield">
                    <h2>Functionality</h2>
                    <h4>Gardeners:</h4>
                    <ul>
                        <li>After you have watered a plant you need to click the "Watered" button on the page of that plant. </li>
                        <li>After you have fertalized a plant you need to click the "Fertalized" button on the page of that plant. </li>
                        <li>This is how you notify the manager that you have done the task</li>
                    </ul>
                    <h4>Managers:</h4>
                    <ul>
                        <li>Can add and delete plants and users </li>
                        <li>To see the watering schedual of a plant you need to go to the pag of that plant plant look for "need watering/fertalizing every x day"</li>
                    </ul>
                </div>
            </div>

        </div>

    );
}

export default Help;