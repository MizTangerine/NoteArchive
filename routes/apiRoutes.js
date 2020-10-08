const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const db = './db/db.json';

function dbNotes() {
    return JSON.parse(fs.readFileSync(db, "utf-8"));
};

// *** Gets All Notes
router.get('/notes/', (req, res) => {
    dbNotes();
    res.json(dbNotes());
});

// ***Posts New Note
router.post('/notes', (req, res) => {
    const notes = dbNotes();
    const newNote = { id: Date.now(), title: req.body.title, text: req.body.text }
    notes.push(newNote)
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(newNote);
        }
    })
});

// ***Deletes note with specific id
router.delete('/notes/:id', (req, res) => {
    let notes = dbNotes();
    notes = notes.filter((note => note.id !== parseInt(req.params.id)));
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(notes);
        }
    })
})

module.exports = router;