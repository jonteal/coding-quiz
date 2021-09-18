var startButton = document.querySelector(".start-btn");
var questionContainerElement = document.getElementById('question-container');

// Start Button Event
startButton.addEventListener("click", startGame);
startButton.addEventListener("click", setTime);


function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {

}

function selectAnswer() {

}


var questions = [
    {
        question: 'Which animal is the symbol for House Stark?',
        answers: [
            {text: 'Dragon', correct: false },
            {text: 'Direworlf', correct: true },
            {text: 'Lion', correct: false },
            {text: 'Stag', correct: false}
        ]
    }
]
































// Timer 
var timeEl = document.querySelector(".time");

var mainEl = document.getElementById("main");

var secondsLeft = 60;

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds remaining.";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            // sendMessage();
        }
    

    }, 1000);
}



