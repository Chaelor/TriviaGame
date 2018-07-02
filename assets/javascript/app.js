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
            correctAnswer: "The Aromic Bomb"
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
    var quizTimer = 10;
    var counter = 0;
    let questionNumber = 1;
    var selectedAnswer =  0;
    var incorrect = 0;
    var correct = 0;

    function startGame() {
        quizArea.html("<p><button class='btn-style btn'> Click to begin </button></p>");
    }
    startGame();


    $(".btn").on("click", function () {
        countdownTimer();
        quizRender();
    })

    function countdownTimer() {
        setInterval(decrease, 1000);
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
            $(".welcome").html("<div> Time remaining: " + quizTimer + "</div>")
        }
    }

    function quizRender() {
        //Add a go to results page
        if (questionNumber === 6) {
            $(".welcome").html("<h1> Thanks for playing!</h1>")
            quizArea.html("<p> You got: " + incorrect + "/5 questions incorrect</p>");
            quizArea.html("<p> You got: " + correct + "/5 questions correct</p>")
        } else {
            quizArea.html("<div class='setup'> Question " + questionNumber + ": </div>" +
                "<div class='question'> " + quizQuestionsArray[counter].question + "</div>")
            quizArea.append(
                "<p class='answer'> a: " + quizQuestionsArray[counter].answers.a + "</p>" +
                "<p class='answer'> b: " + quizQuestionsArray[counter].answers.b + "</p>" +
                "<p class='answer'> c: " + quizQuestionsArray[counter].answers.c + "</p>");
            questionNumber++;
        }
    }

    //Change this to incorporate a victory//loss screen
    $("body").on("click", ".answer", function (event) {
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswersArray[counter]) {
            console.log(this + "Win");
            console.log("Win");
            correct++
        } else {
            console.log(this + "Lose");
            console.log("Lose");
            incorrect++;
        }
    })
});