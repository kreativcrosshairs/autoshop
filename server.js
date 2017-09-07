/*
| ========================================
| DEPENDENCIES
| ========================================
*/

// modules -------------------------------
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// config --------------------------------
const config = require('./server/config');


/*
| ==================================================================
| MONGODB
| ==================================================================
*/
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI, { useMongoClient: true })
    .then(() => {
        console.info(`Connected to MongoDB: ${config.MONGODB_URI}`);
    }).catch(err => {
        console.error(`MongoDB Connection error: ${err}`);
    });


/*
| ==================================================
| APP
| ==================================================
*/
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set port ----------------------------
const port = process.env.PORT || '8080';
app.set('port', port);


/*
| =============================================================
| ROUTES
| =============================================================
*/
require('./server/api')(app, config);

// pass routing to angular app --------------------------------
// don't run in dev -------------------------------------------
if (process.env.NODE_ENV !== 'dev') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/dist/index.html'));
    });
}


/*
| =====================================================
| SERVER
| =====================================================
*/
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});