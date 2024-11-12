// Modules/Library Import
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Importing Configuration
const { PORT } = require('./config');


app.use(express.json());

app.listen(PORT, (err) => {
    if (err){
        console.log(`Error running server: ${err}`)
    }
    console.log(`Server is running on port localhost:${PORT}`)
});

app.use(express.static('public'))

app.get("/status", (req, res) => {
    const status = {
        "Status": "Running"
    };
    
    res.send(status);
});

// COMMENTED TO TEST FUNCTIONALITY 11/10/2024
// app.post("/register", (req, res));
// app.post("/login", (req, res));
// app.get("/user" (req, res));
