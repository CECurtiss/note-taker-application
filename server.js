const express = require("express");
const path = require('path');

const noteData = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Navigate to notes.html");
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.post("/db/db.json", (req, res) => {
  res.json(`${req.method} request received`);

  console.info(req.rawHeaders);

  console.info(`${req.method} request received`);
});

app.get('api/', (req,res) => res.json(noteData));

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
