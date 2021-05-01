const nodemailer = require('nodemailer')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// TODO: fix templating CSS issues
// TODO: change link url

async function mailInvite(recipient, managerName, role, link) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Hotmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const info = await transporter.sendMail({
            from: '"Plan-ts" <plan-ts@outlook.com>',
            to: recipient,
            subject: 'Your invite to Plan-ts',
            html: `
        <div>
            <style>
                * {
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
                        'Lucida Sans', Arial, sans-serif;
                }

                body {
                    background-color: #cfd0cb;
                }

                header {
                    width: 100%;
                    background-color: #63675d;
                    display: flex;
                    justify-content: center;
                }

                header img {
                    width: 150px;
                    padding: 30px;
                }

                main {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .button {
                    padding: 2% 6%;
                    background-color: #b5cc85;
                    text-decoration: none;
                    color: black;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    margin: 20px 0 50px 0;
                }

                p {
                    width: 60%;
                    margin-bottom: 20px;
                }

                hr {
                    border: none;
                    width: 80%;
                    background-color: #63675d;
                    color: #63675d;
                    height: 2px;
                }
            </style>

            <header class="header">
                <img src="cid:logo@plan-ts" alt="Plan-ts logo" />
            </header>

            <main>
                <h1>Invite to Plan-ts system</h1>
                <p>
                    ${managerName} has invited you to be a ${role} in the Plan-ts system. To
                    register your user details, please click the link below.
                </p>

                <a href="${process.env.HOST}/register/${link}" class="button">Register user</a>

                <br/ >
                <br/ >

                <hr />

                <h1>About Plan-ts</h1>
                <p>
                    Plan-ts is a plant care system that the Department of Design at NTNU
                    uses to take care of their plants. As a user of the system you will
                    be able to see when the plants need water and fertilizer, and mark
                    tasks as done.
                </p>
            </main>
        </div>
        `,
            attachments: [
                {
                    filename: 'logo.png',
                    path: './services/email/logo.png',
                    cid: 'logo@plan-ts'
                }
            ]
        })

        console.log(`Message sent: %s`, info.messageId)
    } catch (err) {
        console.log(`Could not send message. [${err}]`)
    }
}

module.exports = mailInvite
