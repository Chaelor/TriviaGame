$(document).ready(function () {
    quizQuestionOne =
        {
            question: "What is the highest mountain peak on earth?",
            answers: {
                a: "Mt. Fuji",
                b: "Mt. Saint Helens",
                c: "Mt. Everest"
            },
            correctAnswer: "c"
        };

    quizQuestionTwo =
        {
            question: "What came out of Project Manhattan?",
            answers: {
                a: "The world's greatest potato salad",
                b: "The Atomic Bomb",
                c: "The city of New York"
            },
            correctAnswer: "b"
        }
    quizQuestionThree =
        {
            question: "What is slope intercept form?",
            answers: {
                a: "y = mx + b",
                b: "a^2 + b^2 = c^2",
                c: "1/2 bh"
            },
            correctAnswer: "a"
        }
    quizQuestionFour =
        {
            question: "What is a popular distro of linux?",
            answers: {
                a: "Mint",
                b: "RaspberryPI",
                c: "Ardunio"
            },
            correctAnswer: "a",
        }
    quizQuestionFive =
        {
            question: "Timmy Turner was a character on what TV show?",
            answers: {
                a: "Jimmy Neutron",
                b: "The Fairly Odd Parents",
                c: "Full House"
            },
            correctAnswer: "b"
        }

//Store all of the questions into an array so I can access them later
quizQuestionArray=[];
quizQuestionArray.push(quizQuestionOne, quizQuestionTwo, quizQuestionThree, quizQuestionFour, quizQuestionFive);
questionAnswers=[];
console.log(quizQuestionArray);
for(let i = 0; i < quizQuestionArray.length; i++){
    console.log(quizQuestionArray[i].question);
    console.log(quizQuestionArray[i].answers.a);
    console.log(quizQuestionArray[i].answers.b);
    console.log(quizQuestionArray[i].answers.c);
}

quizQuestionOne.answers.each(function() {$(".quizContent").html("<input type='radio'>")});
});