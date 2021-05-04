let express = require('express');
let bodyParser = require('body-parser');


let db = require('./db');

let app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let candidateRoute = require('./routes/candidate');
let testScoreRoute = require('./routes/testScore')

app.use('/candidate', candidateRoute);
app.use('/score',testScoreRoute);


let Port = 3000;
app.listen(Port, function(res) {
    console.log('Listen to', Port)
});