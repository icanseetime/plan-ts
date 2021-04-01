# Plant-ts

## Frontend

[Link](./frontend/README.md)

### File structure

```
📂frontend
|
└───📂public
|
└───📂src
    └───📂assets      // Images, extra files
    └───📂components  // All components in the app
    |   └───📂forms   // Components related to forms
    └───📂pages       // Components that represent distinct pages
    └───📂routes      // Authorization and routes for frontend
    └───📂utils       // Scripts, functions, etc.
    |
    └─📄fileApp.js
    └─📄App.css
    └─📄index.js
    └─📄index.css
```

## Backend

[Link](./backend/README.md)

### File structure

```
📁backend
|
└───📁auth            // Authorization and authentication files
|
└───📁docs            // Documentation [swagger]
|
└───📁models          // Schema models for MongoDB/mongoose
|
└───📁routes          // Endpoints and routes for API
|   └───📁plants      // /api/plants
|   └───📁users       // /api/users
|   └─📄index.js      // /api
|
└─📄.env              // Environment variables
└─📄.env.local        // Local environment variables
└─📄server.js         // Main server setup
└─📄test.rest         // Test file for testing API endpoints
```
