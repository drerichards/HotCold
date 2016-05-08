'use strict'
var secretNumber;
var guessValue;	
var counter = 0;
var duplicateGuess = false;
var pastGuessArray = [];
var newButton;
var guess = document.getElementById('userGuess');
var oldCount = document.getElementById('count');
var feedback = document.getElementById('feedback');
var inputBox = document.getElementById('input');
var guessList = $('#guessList');
var form = $('form');
var input = form.find('#userGuess');


/*--- ============================================================= ---*/
/*--- ============================================================= ---*/
/*--- ============================================================= ---*/

/*--- DOM ---*/
$(document).ready(function(){
	makeSecretNum();

  newButton = $('a.new');
  
  form.submit(function(event) {
    event.preventDefault();
    getUserGuess();
});
  
newButton.click(newGame);

/*--- Functions ---*/

//Create new game
function newGame(){
	input.show();
	resetVariables();
	makeSecretNum();
}

//Resets values and defaults text to original
function resetVariables(){
	guessList.empty();
	counter = 0;
	duplicateGuess = false;
	pastGuessArray = [];
	feedback.innerHTML = "Make your Guess!";
	oldCount.innerHTML = 0;
	$('#userGuess').val('');
}

//Generate new random number
function makeSecretNum(){
	secretNumber = Math.floor(Math.random() * 100) + 1;
	alert(secretNumber);
}

//Guess Intake
function getUserGuess(){
	guessValue = (Math.abs(parseInt(guess.value), 10));
	//reset value
	input.val('');
  	//focus on input for next guess
  	input.focus();

	if(guessValue % 1 !== 0) {
		alert('Please Input a Number');
		return true;
	}
	
	if (guessValue > 100 || guessValue < 1){
		alert('Please Choose a Number Between 1-100');

	} else if (guessValue <= 100 || guessValue >= 1){
		validateGuess();
		feedbackOutput();

		} else {
			alert('Invalid Character. Please Choose a Number Between 1-100');
			}
}

//Validates if user guess has been guessed
function validateGuess(){
	if (pastGuessArray.length > 0){
		var arrayValue;
		//for each array index of the guess array
		for (arrayValue of pastGuessArray){
			//if the index matches the user guess
			if (arrayValue === guessValue){
				alert('You\'ve already guessed '+guessValue+'. Try again!');
				//validates to true and does not post guess to array and window
				duplicateGuess = true;
			}
		}
	}
	postGuessFeedback();
	duplicateGuess = false; 	
}

//Post guesses to window and array if it is not a duplicate
function postGuessFeedback(){
	if (!duplicateGuess){
		counter++;
		oldCount.innerHTML = counter;	
		$('<li class="guessbox"></li>').appendTo("#guessList").text(guessValue);
		pastGuessArray.push(guessValue);
	}
}


//Feedback for user guess
function feedbackOutput(){
	switch(true) {
	    case (secretNumber === guessValue):
	        feedback.innerHTML = "***You got it!***<br/>Click \"New Game\" to play again";
	        input.hide();
	        break;
	    case (Math.abs(secretNumber - guessValue) >= 50):
	    	feedback.innerHTML = "Freezing Cold";
	    	break;
	    case (Math.abs(secretNumber - guessValue) >= 25):
	    	feedback.innerHTML = "Cold";
	        break;
	    case (Math.abs(secretNumber - guessValue) >= 15):
	    	feedback.innerHTML = "Warm";
	    	break;
	    case (Math.abs(secretNumber - guessValue) >= 10):
	    	feedback.innerHTML = "Hot";
	    	break;
	    case (Math.abs(secretNumber - guessValue) >= 5):
	    	feedback.innerHTML = "Really Hot";
	    	break;
	    case (Math.abs(secretNumber - guessValue) >= 1):
	    	feedback.innerHTML = "Burning Up!";
	        break;
	}
}


/*--- ============================================================= ---*/
/*--- ============================================================= ---*/
/*--- ============================================================= ---*/

	/*--- Display information modal box ---*/
	$(".what").click(function(){
		$(".overlay").fadeIn(1000);
	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});
	
	
	/*--- Display information tool tip on hover ---*/
	$(function(){
		$(inputBox).tooltip();
	});	
});