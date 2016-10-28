
module.exports = function(app, path) {
	// Basic route for home page
	app.get('/', function(req, res) {
	    res.sendFile(path.join(__dirname, '../public/index.html'));
	});
	
	// Basic route for survey page
	app.get('/survey', function(req, res) {
	    res.sendFile(path.join(__dirname, '../public/survey.html'));
	});
}