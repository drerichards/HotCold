'use strict'
var secretNumber;
var guess;
var pastGuesses;
var counter = 0;
var oldCount;
var guessValue;	



function newGame() {
	resetVariables();
	makeSecretNum();
}


function resetVariables() {
	counter = 0;
}

function makeSecretNum(){
	secretNumber = Math.floor(Math.random() * 100) + 1;
	alert(secretNumber);
}

function getUserGuess(){
	$('#guessButton').click(function(event) {
		event.preventDefault();
			guess = document.getElementById('userGuess');
			guessValue = (Math.abs(parseInt(guess.value), 10));
			$('<li class="guessbox"></li>').appendTo("#guessList").text(guessValue);
			counter++;
			oldCount = document.getElementById('count');
			oldCount.innerHTML = counter;
	});
}



$(document).ready(function(){

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$('.new').click(function(event){
  		event.preventDefault();
  		newGame();
  	}

  	makeSecretNum();
  	$('#userGuess').keyup(function(event){
    if(event.keyCode == 13) {
      		event.preventDefault();
      		$('#guessButton').click();

    	};
  	}); 

	// do { getUserGuess
	// } while (guessValue != secretNumber);






});