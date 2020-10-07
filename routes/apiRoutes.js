const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// *** Gets All Notes
router.get('/notes/', (req, res) => {
    const db = require('../db/db.json')
    res.json(db)
    console.log('get all')
});

// ***Posts New Note
router.post('/notes', (req, res) => {
    const db = require('../db/db.json')
    const newNote = { id: Date.now() + '', title: req.body.title, text: req.body.text }
    console.log('post ', db)
    db.push(newNote)
    console.log('new note', newNote)
    // assignID();
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), (err) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(newNote)
        }
    })
});

// ***Deletes note with specific id
router.delete('/notes/:id', (req, res) => {
    let db = require('../db/db.json')
    console.log('delete', db)
    console.log('req.params', req.params)
    const selected = db.some(note => note.id === req.params.id)
    if (selected) {
        db = db.filter(note => note.id !== req.params.id)
        console.log("Deleted note with id ", req.params.id);
        console.log('after delete ', db)
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), (err) => {
            if (err) {
                res.send(err)
            } else {
                // res.json(db).reload()
                res.json({ ok: true }).reload()
            }
        })
    }
});


module.exports = router;