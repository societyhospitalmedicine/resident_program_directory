require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// You then only have to add router in app.js file and MongoDB connection whit Mongoose. app.js :

// var routes = require('./routes/index');
var speakers = require('./routes/speakers');
//  ...

app.use(bodyParser.json());

app.use(express.static('public/dist')); 
app.use(express.static('public/static')); 
// app.use('/', routes);
// before '/' was /speakers
app.use('/', speakers);
//  ...


// app.use('/', itemRoutes);
app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' });
});




app.listen(process.env.PORT||8080, function() {
    console.log('Listening on port 8080');
});

exports.app = app;
/**/