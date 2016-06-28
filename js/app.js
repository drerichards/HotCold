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
$(document).ready(function() {
    makeSecretNum();
    newButton = $('a.new');
    form.submit(function(event) {
        event.preventDefault();
        getUserGuess();
    });

    newButton.click(newGame);

    /*--- Functions ---*/

    //Create new game
    function newGame() {
        input.show();
        resetVariables();
        makeSecretNum();
    }

    //Resets values and defaults text to original
    function resetVariables() {
        guessList.empty();
        counter = 0;
        duplicateGuess = false;
        pastGuessArray = [];
        feedback.innerHTML = "&nbsp;";
        oldCount.innerHTML = 0;
        input.show();
        $('#userGuess').val('');
        $('.w3-container').css('display', 'none');
				$('.button').unbind();
				$('#feedback').css('font-family', 'Pinniepoker');
    }

    function showAlert(title, message) {
        $('#alertBar').css('visibility', 'visible');
        $('#alertBar').append('<div class="w3-container w3-section w3-animate-top w3-blue"></div>');
        $('.button').bind('click', function(e) {
            e.preventDefault();
        });
        setTimeout(function() {
            $('.w3-container').remove(),
            $('.button').unbind();
        }, 3000);

        $('.w3-container').append('<span onclick="this.parentElement.style.display=\'none\'" class="w3-closebtn">&times;</span>');
        $('.w3-container').append('<h3>' + title + '</h3>');
        $('.w3-container').append('<p>' + message + '</p>');
    }


    //Generate new random number
    function makeSecretNum() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        alert(secretNumber);
    }

    //Guess Intake
    function getUserGuess() {
        guessValue = (Math.abs(parseInt(guess.value), 10));
        //reset value
        input.val('');
        //focus on input for next guess
        input.focus();

        if (guessValue % 1 !== 0) {
            var title = 'Invalid Character';
            var message = 'Please Choose a Number Between 1-100';
            showAlert(title, message);
            return true;
        }

        if (guessValue > 100 || guessValue < 1) {
            var title = 'Entry Out of Range';
            var message = 'Please Choose a Number Between 1-100';
            showAlert(title, message);

        } else if (guessValue <= 100 || guessValue >= 1) {
            validateGuess();
            feedbackOutput();

        } else {
            var title = 'Invalid Character';
            var message = 'Please Choose a Number Between 1-100';
            showAlert(title, message);
        }
    }

    //Validates if user guess has been guessed
    function validateGuess() {
        if (pastGuessArray.length > 0) {
            var arrayValue;
            //for each array index of the guess array
            for (arrayValue of pastGuessArray) {
                //if the index matches the user guess
                if (arrayValue === guessValue) {
                    var title = 'Try Again';
                    var message = 'You\'ve already guessed ' + guessValue + '!';
                    showAlert(title, message);
                    //validates to true and does not post guess to array and window
                    duplicateGuess = true;
                }
            }
        }
        postGuessFeedback();
        duplicateGuess = false;
    }

    //Post guesses to window and array if it is not a duplicate
    function postGuessFeedback() {
        if (!duplicateGuess) {
            counter++;
            oldCount.innerHTML = counter;
            $('<li class="guessbox"></li>').appendTo("#guessList").text(guessValue);
            pastGuessArray.push(guessValue);
        }
    }


    //Feedback for user guess
    function feedbackOutput() {
        switch (true) {
            case (secretNumber === guessValue):
                $('#alertBar').css('visibility', 'visible');
                $('#alertBar').append('<div class="w3-container w3-section w3-animate-top w3-lime"></div>');
                $('.w3-container').append('<span onclick="this.parentElement.style.display=\'none\'" class="w3-closebtn">&times;</span>');
                $('.w3-container').append('<h3>The Secret Number is '+secretNumber+'</h3>');
                $('.w3-container').append('<p>Click \"New Game\" to play again!</p>');
								$('#feedback').css('color', '#000');
								$('#feedback').css('font-family', 'Architext');
                feedback.innerHTML = "***Great Job!***";
								$('.button').bind('click', function(e) {
				            e.preventDefault();
				        });
                break;
            case (Math.abs(secretNumber - guessValue) >= 50):
                feedback.innerHTML = "Freezing Cold";
                $('#feedback').css('color', '#00CDDB');
                break;
            case (Math.abs(secretNumber - guessValue) >= 25):
                feedback.innerHTML = "Cold";
                $('#feedback').css('color', '#0079DB');
                break;
            case (Math.abs(secretNumber - guessValue) >= 15):
                feedback.innerHTML = "Warm";
                $('#feedback').css('color', '#DBA100');
                break;
            case (Math.abs(secretNumber - guessValue) >= 10):
                feedback.innerHTML = "Hot";
                $('#feedback').css('color', '#DB6300');
                break;
            case (Math.abs(secretNumber - guessValue) >= 5):
                feedback.innerHTML = "Really Hot";
                $('#feedback').css('color', '#DB4200');
                break;
            case (Math.abs(secretNumber - guessValue) >= 1):
                feedback.innerHTML = "Burning Up!";
                $('#feedback').css('color', '#DB2500');
                break;
        }
    }



    /*--- ============================================================= ---*/
    /*--- ============================================================= ---*/
    /*--- ============================================================= ---*/

    /*--- Display information modal box ---*/
    $(".what").click(function() {
        $(".overlay").fadeIn(1000);
    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });


    /*--- Display information tool tip on hover ---*/
    $(function() {
        $(inputBox).tooltip();
    });
});
