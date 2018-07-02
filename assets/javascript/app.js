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
    correctAnswersArray = [];
    correctAnswersArray.push(quizQuestionOne.correctAnswer, quizQuestionTwo.correctAnswer, quizQuestionThree.correctAnswer, quizQuestionFour.correctAnswer, quizQuestionFive.correctAnswer, )
    console.log(correctAnswersArray);

    //The only timer, go back and change this to have a few timers when I refresh the page

    var quizArea = $(".quizArea");
    var welcome = $(".welcome");
    var quizTimer = 10;
    var counter = 0;
    var questionNumber = 1;
    var userChoice = 0;
    var incorrect = 0;
    var correct = 0;

    function startGame() {
        quizArea.html("<p><button class='btn-style btnStart'> Click to begin </button></p>");
    }
    startGame();


    $(".btnStart").on("click", function () {
        quizRender();
    })


    function countdownTimer() {
        timer = setInterval(decrease, 1000);
        function decrease() {
            if (quizTimer > 0) {
                quizTimer--;
            }
            if (quizTimer > 6) {
                $(".welcome").addClass("greenTimer");
            }
            if (quizTimer < 6 && quizTimer > 3) {
                $(".welcome").removeClass("greenTimer");
                $(".welcome").addClass("yellowTimer");
            }
            if (quizTimer < 3) {
                $(".welcome").removeClass("yellowTimer");
                $(".welcome").addClass("redTimer");
            }
            if(quizTimer === 0) {
                renderNoTimeRemaining();
                clearInterval(timer);
            }
            welcome.html("<div><h2> Time remaining: " + quizTimer + "</h2></div>")
        }
    }

    function quizRender() {
        countdownTimer();
        quizArea.html("<div class='setup'> Question " + questionNumber + ": </div>" +
            "<div class='question'> " + quizQuestionsArray[counter].question + "</div>")
        quizArea.append(
            "<div class='answer'>" + quizQuestionsArray[counter].answers.a + "</div>" +
            "<div class='answer'>" + quizQuestionsArray[counter].answers.b + "</div>" +
            "<div class='answer'>" + quizQuestionsArray[counter].answers.c + "</div>");
        questionNumber++;
    }

    function renderWin() {
        welcome.removeClass("greenTimer");
        welcome.removeClass("yellowTimer");
        welcome.removeClass("redTimer");
        quizArea.html("<div><h2>Congratulations! You got the question correct!</h2></div>");
        correct++;
        setTimeout(transitionTimer, 5000);
    }

    function renderLoss() {
        welcome.removeClass("greenTimer");
        welcome.removeClass("yellowTimer");
        welcome.removeClass("redTimer");
        quizArea.html("<div class='redTimer'><h2>RIPPPPPP! You are incorrect!</h2></div>");
        incorrect++;
        setTimeout(transitionTimer, 5000);
    }

    function renderNoTimeRemaining() {
        welcome.removeClass("greenTimer");
        welcome.removeClass("yellowTimer");
        welcome.removeClass("redTimer");
        quizArea.html("<div class='redTimer'><h2>HOW DARE YOU NOT ANSWER! Counts as incorrect!</h2></div>");
        incorrect++;
        counter++;
        setTimeout(transitionTimer, 5000);
    }

    function transitionTimer() {
        if (questionNumber < 6) {
            quizRender();
            quizTimer = 10;
            countdownTransitionTimer();
        } else {
            welcome.html("<h1> Thanks for playing!</h1>")
            quizArea.html("<div> You got: " + incorrect + "/5 questions incorrect</div>");
            quizArea.append("<div> You got: " + correct + "/5 questions correct</div>");
            quizArea.append("<div><button class='btn-style btnReset'> Try again! </button></div>");
        }
    }

    function resetGame() {
    quizTimer = 10;
    counter = 0;
    questionNumber = 1;
    userChoice = 0;
    incorrect = 0;
    correct = 0;

    quizRender();
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

    $(".btnReset").on("click", function() {
        resetGame();
    });

});