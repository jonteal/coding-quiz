// Assigned Variables 
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElem = document.getElementById('question-container');
var questionElem = document.getElementById('question');
var answerButtonsElem = document.getElementById('answer-buttons');

// Score-Related Variables
var lastScore = document.getElementById('last-score');
var highScore = document.getElementById('high-score');
var isWin = false;
var lastScoreCounter = 0;
var highScoreCounter = 0;

// Timer-related Variables
var timer;
var timerCount;
var timerElement = document.querySelector('.timer-count');

// Calls init() so that it fires when page is opened
init();

// The init function is called when the page loads
function init() {
    getLastScore();
    getHighScore();
}

// Variables That Can be Changed
let shuffledQuestions, currentQuestionIndex;

// Start Button Event to Begin Game
startButton.addEventListener("click", startGame);

// Next Button Event to Go to Next Question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

// Function to Hide Start Button, Display and Shuffle Questions Randomly
function startGame() {
    isWin = false;
    timerCount = 60;
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElem.classList.remove('hide');
    setNextQuestion();
    startTimer()
}

// Function to Set the Next Question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Function to Display Question and Answer Buttons
function showQuestion(question) {
    // Accesses the 
    questionElem.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElem.appendChild(button);
    })
}

// Function to Reset State During Every Question
function resetState() {
    clearStatusClass(document.body);
    
    // Hides Next Button
    nextButton.classList.add('hide');
    while (answerButtonsElem.firstChild) {
        answerButtonsElem.removeChild(answerButtonsElem.firstChild);
    }
}

// Function to Validate Selected Answers from User
function selectAnswer(e) {
    var selectedButton = e.target;

    // Setting Variable for Correct Answer in Dataset
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElem.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    
    // Shows Next Button if There is At Least 1 Question Remaining
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } 
    // Else Shows the Restart Button
    else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

// Establishes Correct/Wrong Answers Based on User's Pick
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Resets the Status of Correct/Wrong Answer After Each User Pick
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
            {text: 'Direwolf', correct: true },
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

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets Timer
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                winGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

// Subtracts 10 Seconds if Player Gets a Wrong Answer
var minus10 = document.getElementById("")
function subtractTime() {
    if (selectedButton !== correct) {
        secondsLeft - 10;
    }
}

function setLastScore() {
    lastScore.textContent = lastScoreCounter;
    localStorage.setItem("lastScoreCount", lastScoreCounter);
}

function setHighScore() {
    highScore.textContent = highScoreCounter;
    localStorage.setItem("highScoreCount", highScoreCounter);
}

function getLastScore() {
    var storedLastScore = localStorage.getItem("lastScoreCount");
    if (storedLastScore === null) {
        lastScoreCounter = 0;
    } else {
        lastScoreCounter = storedLastScore;
    }

    lastScore.textContent = lastScoreCounter;
}

function getHighScore() {
    var storedHighScore = localStorage.getItem("highScoreCount");
    if (storedHighScore === null) {
        highScoreCounter = 0;
    } else {
        highScoreCounter = storedHighScore;
    }

    highScore.textContent = highScoreCounter;
}


var resetButton = document.querySelector(".reset-button");

function resetGame() {
    // Resets the last score and high score
    lastScoreCounter = 0;
    highScoreCounter = 0;
    // Renders last score and high score counts and sets them into client storage
    setLastScore()
    setHighScore()
}

// Attaches event listener to button
resetButton.addEventListener("click", resetGame);


// I would like it...
// Have the restart button also restart the clock, i.e. the entire game
// Have the timer subtract 10 seconds every time there is a wrong answer
// Display a message to the User at the end of the game
// Stop the clock and display it as the Player's score at the end of the game
// Have an input for the player's initials and save their score 
// I want to create a losing message/scenario for if the Player doesn't finish in time
// I want a reset score function/button