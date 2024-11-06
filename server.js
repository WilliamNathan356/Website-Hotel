const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.json());
const PORT = process.env.port || 7777;
app.listen(PORT, (err) => {
    if (err){
        console.log(`Error running server: ${err}`)
    }
    console.log(`Server is running on port ${PORT}`)
});

app.use(express.static('public'))

// app.get('/', (req, res) => (
//     res.redirect('/home')
// ));

// app.get('/home', (req, res) => {
//     const filePath = {
//         root: path.join(__dirname, '/public')
//     };
//     res.sendFile('index.html', filePath, (err) => {
//         if(err) {
//             console.log('Error Displaying File: ', err)
//         } else {
//             console.log('Success Displaying File!')
//         }
//     });
//   });

