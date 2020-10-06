const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const db = require('../db/db.json')

// *** Gets All Notes
router.get('/notes/', (req, res) => {
    // let db = require('../db/db.json')
    res.json(db)
    console.log('get all')
});

// ***Posts New Note
router.post('/notes', (req, res) => {
    const newNote = (req.body)
    let db = require('../db/db.json')
    // console.log(db)
    db.push(newNote)
    console.log('new note', newNote)
    assignID();
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
    // res.send('api.delete')
    let db = require('../db/db.json')
    db.splice(req.params.id, 1);
    assignID();
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), (err) => {
        if (err) {
            res.send(err)
        } else {
            res.json(db)
        }
    })
    // console.log(req.params)
    console.log("Deleted note with id " + req.params.id);
});

function assignID() {
    for (i = 0; i < db.length; i++) {
        db[i].id = i;
    }
}



module.exports = router;