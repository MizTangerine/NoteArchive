const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/notes/', (req, res) => {
    let db = require('../db/db.json')
    res.json(db)
});

router.post('/notes', (req, res) => {
    const newNote = (req.body)
    let db = require('../db/db.json')
    console.log(db)
    db.push(newNote)
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), (err) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(newNote)
        }
    })
});

router.delete('/notes/:id', (req, res) => {
    res.send('api.delete')
});




module.exports = router;