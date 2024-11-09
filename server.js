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

// COMMENTED TO TEST FUNCTIONALITY 11/10/
// app.post("/register", (request, response));
// app.post("/login", (request, response));
