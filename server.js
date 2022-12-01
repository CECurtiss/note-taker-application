const express = require("express");
const path = require('path');

const noteData = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Navigate to notes.html");
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.post("/api/notes", (req, res) => {
  
});

app.get('/api/notes', (req,res) => res.json(noteData));

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
