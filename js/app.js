'use strict'
var secretNumber;
var guessValue;	
var guess;
var pastGuessArray=[];
var counter = 0;
var oldCount = document.getElementById('count');
var feedback = document.getElementById('feedback');
var duplicateGuess = false;


function makeSecretNum(){
	secretNumber = Math.floor(Math.random() * 100) + 1;
	alert(secretNumber);
}


function getUserGuess(){
	guess = document.getElementById('userGuess');
	guessValue = (Math.abs(parseInt(guess.value), 10));

		if (guessValue > 100 || guessValue < 0){
			alert('Please Choose a Number Between 0-100');
			} else if (guessValue <= 100 || guessValue >= 0){
					
					// alert(pastGuessArray);
					
					validateGuess();
					feedbackOutput();
				} else {
						alert('Invalid Character. Please Choose a Number Between 0-100');
					}
}

function userClick(){
	$('#guessButton').click(function(event) {
		event.preventDefault();
		getUserGuess();
	});
};

function userEnterKey(){
	$('#userGuess').keydown(function(event){
	    if(event.keyCode == 13) {
    		event.preventDefault();
			getUserGuess();
		}
	});
};

function validateGuess(){
	for (var i = 0; i < pastGuessArray.length; i++){
			if (pastGuessArray[i] === guessValue){
		 		alert('You have already guessed ' + guessValue + '. Try again');
		 		duplicateGuess = true;
			}					
	} postGuessFeedback();		
}

function postGuessFeedback(){
	if (!duplicateGuess){
			counter++;
			oldCount.innerHTML = counter;
		}	
	$('<li class="guessbox"></li>').appendTo("#guessList").text(guessValue);
	pastGuessArray.push(guessValue);
}

function feedbackOutput(){
	switch(true) {
	    case (secretNumber === guessValue):
	        feedback.innerHTML = "You got it!";
	        // alert('New Game?');
	        break;
	    case (Math.abs(secretNumber - guessValue) >= 50):
	    	feedback.innerHTML = "Really Cold";
	    	break;
	    case (Math.abs(secretNumber - guessValue) >= 35):
	    	feedback.innerHTML = "Cold";
	        break;
	    case (Math.abs(secretNumber - guessValue) >= 20):
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


// function newGame() {
// 	resetVariables();
// 	makeSecretNum();
// }


// function resetVariables() {
// 	counter = 0;
// }





$(document).ready(function(){
	makeSecretNum();

	/*--- Display information modal box ---*/
	$(".what").click(function(){
		$(".overlay").fadeIn(1000);
	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

	userEnterKey();
	userClick();
 

	// $('.new').click(function(event){
 //  		event.preventDefault();
 //  		newGame();
 //  	}
});