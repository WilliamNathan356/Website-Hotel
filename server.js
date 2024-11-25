// Modules/Library Import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Sequelize = require('sequelize')

// Import Model
const userModel = require('./model/user');
const roomModel = require('./model/room');
const bookingModel = require('./model/booking');

// Import Configuration
const { PORT } = require('./config');

// Import Routes
const allRoutes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get Running Environment
const env = process.env.NODE_ENV || "development";
const config = require('./dbConfig.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: "sqlite",
    storage: `./storage/${config.database}.sqlite`, // Path to the file that will store the SQLite DB.
  });
  
// Initialising the Model on sequelize
const user = userModel.initialise(sequelize);
const room = roomModel.initialise(sequelize);
const booking = bookingModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
    .sync({ force: true })
    .then(() => {
        console.log("Sequelize Initialised!!");

        // Attach Foreign Key to Tables
        user.hasMany(booking, {
            sourceKey: 'userID',
            foreignKey: 'userID',
        });
        booking.belongsTo(user, {
            targetKey: 'userID',
            foreignKey: 'userID'
        });
        room.hasMany(booking, {
            sourceKey: 'roomID',
            foreignKey: 'roomID',
        });
        booking.belongsTo(room, {
            targetKey: 'roomID',
            foreignKey: 'roomID'
        });

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
