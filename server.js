const express = require("express");
const fs = require("fs");
const path = require("path");

const noteData = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route to get main page
// app.get("/", (req, res) => {
//   res.send("Navigate to notes.html");
// });

// route to notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// route to post notes to db
app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  // take existing info from database
  fs.readFile(`./db/db.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      //parse existing notes w/JSON
      const parsedNotes = JSON.parse(data);

      //push new notes to existing notes
      parsedNotes.push(newNote);

      //rewrite file with new information added
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(parsedNotes, null, 2),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Note Database Updated!");
          }
        }
      );
    }
  });
});

//route to get existing notes from db.
app.get("/api/notes", (req, res) => res.json(noteData));

// app.delete('/db/db.json', (req, res) => )

// route to main page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));


