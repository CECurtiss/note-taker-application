const express = require('express');

const noteData = require('./db/db.json');

const PORT = 3001;

const app = express();

app.post('/db/db.json', (req,res) => {
    res.json(`${req.method} request received`);

    console.info(req.rawHeaders);

    console.info(`${req.method} request received`);
});