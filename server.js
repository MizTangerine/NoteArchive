// ***Require Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// ***Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// ***body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ***set static folder
app.use(express.static(path.join(__dirname, 'public')));

// *** Creates HTML Routes
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// *** Creates API routes





// ***Starts Server
app.listen(PORT, () => console.log(`server started on port ${PORT}`)); 