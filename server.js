const express = require("express");
const path = require('path');

const noteData = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded( { extended: true }))

// route to get main page
// app.get("/", (req, res) => {
//   res.send("Navigate to notes.html");
// });

// route to notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

// route to post notes to db
app.post("/api/notes", (req, res) => {
    let response;

    if (req.body && req.body.product) {
        response = {
            status: 'Success',
            data: req.body,
        };
        res.json(response);
    } else {
        res.status(400).json( {
            status: 'error',
            data: null,
            message: 'Product required'
        })
    }
    console.log(req.body)

    const newNote = req.body;
    
});

app.get('/api/notes', (req,res) => res.json(noteData));

// route to main page
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

// 1:01:56 express.js day 2