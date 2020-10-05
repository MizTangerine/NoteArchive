// ***Require Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRouter = require('./routes/apiRoutes.js')

// ***Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// ***body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ***set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter)

// *** Creates API routes
// app.get("/api/notes", function (req, res) {
//     console.log('hello')
//     let db = require('./db/db.json')
//     res.json(db)
// })

// *** Creates HTML Routes
app.get('/notes', function (req, res) {
    // console.log('html notes')
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('*', function (req, res) {
    // console.log('html index')
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// ***Starts Server
app.listen(PORT, () => console.log(`server started on port ${PORT}`)); 