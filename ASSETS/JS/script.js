// Assigned Variables 
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');

// Variables That Can be Changed
let shuffledQuestions, currentQuestionIndex;


// Start Button Event to Begin Game
startButton.addEventListener("click", startGame);

// Start Button Event to Begin Timer
startButton.addEventListener("click", setTime);

// Next Button Event to Go to Next Question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

// Function to Hide Start Button, Display and Shuffle Questions Randomly
function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

// Function to Set the Next Question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    // questionContainerElement.classList.remove('hide');
}

// 
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Quiz Questions Array
const questions = [
    {
        question: 'Which animal is the symbol for House Stark?',
        answers: [
            {text: 'Dragon', correct: false },
            {text: 'Direworlf', correct: true },
            {text: 'Lion', correct: false },
            {text: 'Stag', correct: false}
        ]
    },
    {
        question: 'How many dragons did Daenerys have?',
        answers: [
            {text: '1', correct: false },
            {text: '2', correct: false },
            {text: '3', correct: true },
            {text: '10', correct: false },
        ]
    },
    {
        question: 'What was the name of the evil army that posed the biggest threat in the show?',
        answers: [
            {text: 'The Weeping Willows', correct: false },
            {text: 'The Great Horde', correct: false },
            {text: 'The Golden Army', correct: false },
            {text: 'The White Walkers', correct: true },
        ]
    },
    {
        question: 'What was arguably the most popular phrase coined from this series?',
        answers: [
            {text: 'We all float down here.', correct: false },
            {text: 'Winter is coming.', correct: true },
            {text: 'You shall not pass!', correct: false },
            {text: 'May the force be with you.', correct: false },
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



