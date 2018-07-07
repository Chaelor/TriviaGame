$(document).ready(function () {
    quizQuestionOne =
        {
            question: "What is the highest mountain peak on earth?",
            answers: {
                a: "Mt. Fuji",
                b: "Mt. Saint Helens",
                c: "Mt. Everest"
            },
            correctAnswer: "Mt. Everest"
        };

    quizQuestionTwo =
        {
            question: "What came out of Project Manhattan?",
            answers: {
                a: "The world's greatest potato salad",
                b: "The Atomic Bomb",
                c: "The city of New York"
            },
            correctAnswer: "The Atomic Bomb"
        }
    quizQuestionThree =
        {
            question: "What is slope intercept form?",
            answers: {
                a: "y = mx + b",
                b: "a^2 + b^2 = c^2",
                c: "1/2 bh"
            },
            correctAnswer: "y = mx + b"
        }
    quizQuestionFour =
        {
            question: "What is a popular distro of linux?",
            answers: {
                a: "Mint",
                b: "RaspberryPI",
                c: "Ardunio"
            },
            correctAnswer: "Mint",
        }
    quizQuestionFive =
        {
            question: "Timmy Turner was a character on what TV show?",
            answers: {
                a: "Jimmy Neutron",
                b: "The Fairly Odd Parents",
                c: "Full House"
            },
            correctAnswer: "The Fairly Odd Parents"
        }


    //Store all of the questions into an array so I can access them later
    quizQuestionsArray = [];
    quizQuestionsArray.push(quizQuestionOne, quizQuestionTwo, quizQuestionThree, quizQuestionFour, quizQuestionFive);

    //See above but with answers.
    correctAnswersArray = [];
    correctAnswersArray.push(quizQuestionOne.correctAnswer, quizQuestionTwo.correctAnswer, quizQuestionThree.correctAnswer, quizQuestionFour.correctAnswer, quizQuestionFive.correctAnswer, )

    //jQuery Selections
    var quizArea = $(".quizArea");
    var welcome = $(".welcome");

    //Variables
    //Count down from ten
    var quizTimer = 10;

    //Counter for questions
    var counter = 0;

    //Display the question # correctly
    var questionNumber = 1;

    //User choice goes here
    var userChoice = 0;

    //Score keeping
    var incorrect = 0;
    var correct = 0;

    //Makes a button then lets it be clickable to initialize game
    function startGame() {
        quizArea.html("<button class='btn-style btnStart'> Click to begin </button>");
    }
    startGame();

    //Render the game after the button was clicked
    $(".btnStart").on("click", function () {
        quizRender();
        welcome.addClass('greenTimer');
        welcome.html("<div><h2> Time remaining: " + quizTimer + "</h2></div>");
    });

    //Countdown timer
    function countdownTimer() {
        
        //Reset the timer here if need be, fun fact: You will.
        timer = setInterval(decrease, 1000);

        //Function for the interval to do work add classes to change color. Constantly count down
        function decrease() {
            if (quizTimer > 0) {
                quizTimer--;
            }
            if (quizTimer > 6) {
                welcome.addClass("greenTimer");
            }
            if (quizTimer < 6 && quizTimer > 3) {
                welcome.removeClass("greenTimer");
                welcome.addClass("yellowTimer");
            }
            if (quizTimer < 3) {
                welcome.removeClass("yellowTimer");
                welcome.addClass("redTimer");
            }
            //If the user didn't answer we'll do this instead
            if (quizTimer === 0) {
                welcome.html("<h2 class='redTimer'>TIME OUT!</h2>");
                renderNoTimeRemaining();
                clearInterval(timer);
            }

            //Display time remaining at the top
            welcome.html("<div><h2> Time remaining: " + quizTimer + "</h2></div>")
        }
    }

    //Render the game, give the divs classes to be clickable
    function quizRender() {
        welcome.removeClass('greenTimer');
        welcome.addClass('greenTimer');
        //Start the timer
        countdownTimer();

        //Changes the html to display the question
        quizArea.html("<div class='setup'> Question " + questionNumber + ": </div>" +
            "<div class='question'> " + quizQuestionsArray[counter].question + "</div>");

        //Appends the answers for questions to the above html
        quizArea.append(
            "<div class='answer'>" + quizQuestionsArray[counter].answers.a + "</div>" +
            "<div class='answer'>" + quizQuestionsArray[counter].answers.b + "</div>" +
            "<div class='answer'>" + quizQuestionsArray[counter].answers.c + "</div>");

        //Adds to the counter displaying the question number NOT TO THE QUESTION COUNTER!!!!!!!
        questionNumber++;
    }

    //If the userchoice = correctAnswer do this. Removes all colored classes, tells user they were right.
    function renderWin() {
        welcome.removeClass("greenTimer");
        welcome.removeClass("yellowTimer");
        welcome.removeClass("redTimer");
        welcome.html("<h2 class='greenTimer'>Congratulations!</h2>")
        quizArea.html("<div><h2>You got the question correct! 5 seconds till the next one!</h2></div>");
        correct++;
        setTimeout(transitionTimer, 5000);
    }

    //If the user was wrong, do this:
    function renderLoss() {
        welcome.removeClass("greenTimer");
        welcome.removeClass("yellowTimer");
        welcome.removeClass("redTimer");
        welcome.html("<h2 class='redTimer'> RIIIIIIIIIIP!</h2>");
        quizArea.html("<div><h2>You are incorrect! 5 seconds till the next one! The correct answer was '" 
        + correctAnswersArray[counter] + "'.</h2></div>");
        incorrect++;
        setTimeout(transitionTimer, 5000);
    }

    //If the user didn't select anything, do this:
    function renderNoTimeRemaining() {
        welcome.removeClass("greenTimer");
        welcome.removeClass("yellowTimer");
        welcome.removeClass("redTimer");
        welcome.html("<h2 class='redTimer'>TIME OUT!</h2>");    
        quizArea.html("<div><h2>HOW DARE YOU NOT ANSWER! Counts as incorrect!</h2></div>");
        incorrect++;
        counter++;
        setTimeout(transitionTimer, 5000);
    }

    //Wait 5 seconds between each question and do this
    function transitionTimer() {
        if (questionNumber < 6) {
            quizRender();
            quizTimer = 10;
            welcome.html("<div><h2> Time remaining: " + quizTimer + "</h2></div>")

        //Display the results of the game
        } else {
            welcome.html("<h1> Thanks for playing!</h1>")
            quizArea.html("<div> You got: " + incorrect + "/5 questions incorrect</div>" + 
            "<div> You got: " + correct + "/5 questions correct</div>" +
    
            //At the end of the game, display this button to reset the game.
            "<button class='btn-style btnReset'> Click to reset! </button>");
        }
    }

    //User selects their choice by clicking on some class with .answer
    $("body").on("click", ".answer", function (event) {

        //Stores the choice
        userChoice = $(this).text();

        //Check to see if they got it right
        if (userChoice === correctAnswersArray[counter]) {
            clearInterval(timer);
            renderWin();
            counter++;

            //If they got it wrong
        } else {
            clearInterval(timer);
            renderLoss();
            counter++;
        }
    });

    //Reset the game
    function resetGame() {
        quizTimer = 10;
        counter = 0;
        questionNumber = 1;
        userChoice = 0;
        incorrect = 0;
        correct = 0;

        quizRender();
    }

    //Click the button to restart
    $("body").on("click", ".btnReset",   function () {
        console.log("Working!");
        resetGame();
    });
});