const express = require("express");
const fs = require("fs");
const path = require("path");

const noteData = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route to notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// route to post notes to db
app.post("/api/notes", (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random() * 100000),
  };
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
            res.json(newNote);
          }
        }
      );
    }
  });
});

//route to get existing notes from db.
app.get("/api/notes", (req, res) => {
  //gets an updated list of notes to add instead of a static list from the original page load
  fs.readFile(`./db/db.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data);
      res.json(parsedNotes);
    }
  });
});

// app.delete("api/notes/:id", (req, res) => {
//   fs.readFile(`./db/db.json`, "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//       let parsedNotes = JSON.parse(data);
//       let deleteNote = req.params.id;
//       let removedNotes = parsedNotes.filter(({ id }) => id !== deleteNote);      

//   fs.writeFile(
//     "./db/db.json",
//     JSON.stringify(removedNotes, null, 2),
//     (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Note Database Updated!");
//         res.json(removedNotes)
//       }
//     }
//   );
// });
// });

// route to main page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//listens to a specific PORT
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
