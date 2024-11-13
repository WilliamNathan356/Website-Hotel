// Modules/Library Import
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Sequelize = require('sequelize')

// Import Model
const userModel = require('./model/user');
const roomModel = require('./model/room');

// Import Configuration
const { PORT } = require('./config');

// Import Routes
const allRoutes = require('./routes')

app.use(express.json());

// Get Running Environment
const env = process.env.NODE_ENV || "development";
const config = require('./dbConfig.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: "sqlite",
    storage: `./storage/${config.database}.sqlite`, // Path to the file that will store the SQLite DB.
  });
  
// Initialising the Model on sequelize
userModel.initialise(sequelize);
roomModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
    .sync()
    .then(() => {
        console.log("Sequelize Initialised!!");

        // Attaching the Authentication and User Routes to the app.
        app.use(express.static('public'))
        app.use("/api", allRoutes)

        app.listen(PORT, () => {
            console.log("Server Listening on PORT:", PORT);
        });

        app.get("/status", (req, res) => {
            const status = {
                "Status": "Running"
            };
            
            res.send(status);
        });
    })
    .catch((err) => {
        console.error("Sequelize Initialisation threw an error:", err);
    });

// COMMENTED TO TEST FUNCTIONALITY 11/10/2024
// app.post("/register", (req, res));
// app.post("/login", (req, res));
// app.get("/user" (req, res));
