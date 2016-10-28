// Include dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Set up the express app
var app = express();
var PORT = 3000;

// Set up the app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Serve static asset files (css, js)
app.use('/assets', express.static(__dirname + '/app/public/assets'));

// Start the server to begin listening
app.listen(PORT, function(err) {
	if(err) {
		console.log(err);
	}
	console.log('App is listening on port ' + PORT);
});

// Include routes
require('./app/routing/html-routes.js')(app, path);
require('./app/routing/api-routes.js')(app, path);