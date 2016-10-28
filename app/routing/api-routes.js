var friends = require('../data/friends');

module.exports = function(app, path) {
	// Basic route for home page
	app.get('/api/friends', function(req, res) {
		console.log('res: ' + res.friends);
	    res.json(friends.users);
	});

	// Route for posting new user to friends array
	app.post('/survey', function(req, res) {
		var newUser = req.body;
		//friends.users.push(newUser);
		// Array to store differences between new user and other users
		var prevScore = 0;
		var personIndex = 0;
		
		friends.users.forEach(function(obj, index) {
			console.log('outer loop');
			var currScore = 0;
			obj.scores.forEach(function(score, i) {
				console.log('inner loop');
				console.log('currScore: ' + currScore);
				currScore += Math.abs(newUser.scores[i] - score);
			});
			if(index == 0) {
				prevScore = currScore;
			}
			if(prevScore > currScore) {
				prevScore = currScore;
				personIndex = index;
				console.log('prevScore: ' + prevScore);
				console.log('personIndex: ' + personIndex);
			}
		});
		friends.users.push(newUser);
		console.log('final prevScore: ' + prevScore);
		console.log('final personIndex: ' + personIndex);
		res.send(friends.users[personIndex]);
	});
}