# Plan-ts

## Content

1. [How to run and test project locally](#how-to-run-and-test-project-locally)
    - [Run](#run)
    - [Test](#test)
2. [File structures](#file-structures)
    - [Frontend](#frontend)
    - [Backend](#backend)
3. [Notes](#notes)

---

## How to run and test project locally

### Run

_We assume you use [yarn](https://yarnpkg.com/) to install/run this project. If you would like to use npm instead, just replace `yarn` with `npm run` in any of the commands._

1. Open a terminal and run `yarn full-install` from **the top level** (idg2671-group3 folder) to install all packages. All commands will be run from the top level, unless something else is specified.
2. Optional step: Replace any of the database or email credentials in the [.env](./backend/.env) file with your own. The options are

    - For AWS S3
        - AWS_ACCESS
        - AWS_BUCKET
        - AWS_SECRET
    - For MongoDB
        - DATABASE_URL
    - For Outlook
        - MAIL_USER
        - MAIL_PASS

    If you decide to use your own MongoDB database, you will need to import the [users collection](./xtra_files/users.json) with the name _users_ to your database, in order to be able to log in and manage the system. Same goes for the [locations collection](./xtra_files/locations.json), since this is supposed to be a static database and can not be managed through the application.

    \*_We have also included backup files of all the other collections in the [xtra_files](./xtra_files) folder, if you want your local app to be filled with mock data. They are not needed for the application to run. The collection should always be named the same as the JSON file._

3. To start the servers, you have several options
    1. To start both servers at the same time using [concurrently](https://www.npmjs.com/package/concurrently), run `yarn full-start`
    2. To start only the frontend server, run `yarn frontend-start`
    3. To start only the backend server, run `yarn backend-start`

### Test

If you have not changed the database credentials

1. Log in with either of these user accounts, depending on the functionality you want to test

    ```txt
    manager@ntnu.no          gardener@ntnu.no
    (uw7XRGE                 2A"q>B\m
    ```

2. Optional step: If you want to test the "invite" and "reset password" functionality, log in with the manager profile and create a user with your own e-mail address. Then request to reset the password of this user to receive the e-mail.
3. Test away. Feel free to change anything in the database, we have saved backups of every collection.

---

## File structures

### Frontend

```
📂frontend
|
└───📂public
|   └───📂assets                // Holds the public assets, like the logo
|
└───📂src
    └───📂assets                // Images, extra files
    └───📂components            // All components in the app
    └───📂utils                 // Functions and context
    |
    └─📄App.js                   // Manages token and sets context
    └─📄App.css                  // Main stylesheet
    └─📄index.js                 // Runs App.js
    └─📄index.css                // Sets font for the app
    └─📄setupProxy.js            // Proxy setup
```

### Backend

```
📁backend
|
└───📁auth            // Authorization and authentication files
|
└───📁docs            // Swagger documentation
|
└───📁models          // Schema models for MongoDB/mongoose
|
└───📁routes          // Endpoints and routes for API
|   └───📁feedback    // /api/feedback
|   └───📁locations   // /api/locations
|   └───📁pictures    // /api/pictures
|   └───📁plants      // /api/plants
|   └───📁users       // /api/users
|   └─📄index.js      // /api
|
└───📁services        // Extra services / functions for the API
|
└─📄.env              // Environment variables
└─📄server.js         // Main server setup
```

---

## Notes

-   We have decided to include the .env file with the environment variables already filled out. We are aware that sharing this file is considered bad practice, since it contains sensitive information, but we wanted to make the project easy to test and trust that whoever is doing it will treat the credentials we included in a safe manner.

---

🔝 [Back to top](#plan-ts)
