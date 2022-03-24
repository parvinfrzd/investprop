const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config();


const app = express();

require('./config/database.js');

app.use(logger('dev'));
app.use(express.json());

if (process.env.NODE_ENV === 'production' || process.env.PREVIEW === 'true'){
  app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'build')));
}

// require all routes here: 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/investments', require('./routes/api/investments'));
// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});