// ***Require Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRouter = require('./routes/apiRoutes.js')
const htmlRouter = require('./routes/htmlRoutes.js')

// ***Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// ***body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ***set static folder
app.use(express.static(path.join(__dirname, 'public')));

// *** Creates API routes
app.use('/api', apiRouter)

// *** Creates HTML Routes
app.use('/', htmlRouter)

// ***Starts Server
app.listen(PORT, () => console.log(`server started on port ${PORT}`)); 