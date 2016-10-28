$(document).ready(function() {

    // Establish Url regex
    var validUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    // Dynamically create the <select> boxes
    var questionsArray = [
        "You would prefer brussels sprouts over broccoli, if both were presented to you at the same time.",
        "You enjoy being an expert on one subject, more than a generalized specialist on many subjects.",
        "You wait until the last minute to cram projects into their finished state.",
        "You enjoy travelling to new places without a specific set itinerary.",
        "You derive your energy more from groups of people rather than from being alone.",
        "You are very observant of other people's emotions and intentions.",
        "You prefer cats over dogs.",
        "You love to daydream about fantastical science fiction scenarios.",
        "You would generally be more interested in talking about facts rather than what-ifs.",
        "You value the way that your job makes you feel at the end of the day.",
    ];

    var html = "";
    questionsArray.forEach(function(question, index) {
        html += `<h3><strong>Question ` + (index + 1) + `</strong></h3>
                 <h4>` + question + `</h4>
                 <select class="form-control questions">
                     <option value="">Select...</option>
                     <option value="1">1 (Strongly Disagree)</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5 (Strongly Agree)</option>
                 </select>`
    });

    $('#questions').html(html);

    // Capture the form inputs 
    $("#submit").on("click", function() {
        // Establish array for holding errors
        var errors = [];

        // Capture and validate the name and photo inputs
        var name = $('#name').val();
        var photo= $('#photo').val();

        if(!name) {
            errors.push("You left the name field blank!");
        }
        if(!validUrl.test(photo)) {
            errors.push("Please enter a valid photo Url!");
        }
        /*
        if(!photo) {
            errors.push("You left the photo field blank!");
        }*/

        // Store the answers, and save errors, if any
  	    var answersArray = [];
  	    $('.questions').each(function(index, value) {
  	    	var selection = $(this).val();
            // Validate the selection
            if(!selection) {
                errors.push("You left survey question #" + (index + 1) + " blank!");
            }
  	    	answersArray.push(selection);
  	    });

        // Produce the error message if there were any errors, and show the alert modal
        var errorMsg = "";
        if(errors.length > 0) {
            errors.forEach(function(error, index) {
                errorMsg += "<p>" + error + "</p>";
            });
            $('#alert-msg').html(errorMsg);
            $('#alert-modal').modal("show");
            return false;
        }
        
        // Store the new user information, and submit to the survey API route
  	    var newUser = {
  	    	name: name,
  	    	photo: photo,
  	    	scores: answersArray
  	    }

  	    var filePath = window.location.origin;
        
  	    $.post(filePath + '/survey', newUser) 
  		.done(function(data) {
            // When the post is completed, populate the match modal content and then show the match modal
  			console.log('data: ' , JSON.stringify(data));
            // Clear the inputs
            $('input').val("");
  			$('select').val("");

  			$('.match-heading').text("Congrats! You have matched with " + data.name);
  			$('.match-img').html('<img src="' + data.photo + '" width="90%"" height="auto" alt="Match Person">');
  			$('#match-modal').modal("show");
  		});
    });
});