// Assigned Variables 
var startBtn = document.getElementById('start-btn');
var nextBtn = document.getElementById('next-btn');
var questionContainerElem = document.getElementById('question-container');
var questionElem = document.getElementById('question');
var answerButtonsElem = document.getElementById('answer-buttons');
var initialsForm = document.getElementById('initials-form');

// Score-Related Variables
var lastScore = document.getElementById('last-score');
var highScore = document.getElementById('high-score');
var gameOver = false;
var lastScoreCounter = 0;
var highScoreCounter = 0;

// Timer-related Variables
var timer;
var timerCount;
var timerElement = document.querySelector('.timer-count');

// Calls init() so that it executes when page is opened
init();

// The init function is called when the page loads
function init() {
    getLastScore();
    getHighScore();
}

// Variables That Can be Changed to Shuffled
let shuffledQuestions, currentQuestionIndex;

// Start Button Event to Begin Game
startBtn.addEventListener("click", startGame);

// Next Button Event to Go to Next Question
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

// Function to Hide Start Button, Display and Shuffle Questions Randomly
function startGame() {
    gameOver = false;
    timerCount = 60;
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElem.classList.remove('hide');
    setNextQuestion();
    startTimer()
    initialsForm.classList.add('hide');
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
    nextBtn.classList.add('hide');
    while (answerButtonsElem.firstChild) {
        answerButtonsElem.removeChild(answerButtonsElem.firstChild);
    }
}

// Function to Validate Selected Answers from User
function selectAnswer(e) {
    var selectedButton = e.target;

    // Setting Variable for Correct Answer in Dataset
    var correct = selectedButton.dataset.correct;
    // console.log(correct);
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElem.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })

    // Tests if the answer is incorret and subtracts 10 seconds if so
    if (!correct) {
        timerCount -= 10; 
    }
    
    // Shows Next Button if There is At Least 1 Question Remaining
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    } 
    // Else Shows the Restart Button
    else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
        gameOver = true;
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
    },
    {
        question: 'Who famously said "I drink and I know things?',
        answers: [
            {text: 'Tyrion Lannister', correct: true },
            {text: 'Theon Greyjoy', correct: false },
            {text: 'Robert Baratheon', correct: false },
            {text: 'Jaime Lannister', correct: false },
        ]
    }
]

// The setTimer function starts and stops the timer and triggers winGame() and timeOut()
function startTimer() {
    // Sets Timer
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (gameOver && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                winGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            timeOut();
        }
    }, 1000);
}

// The winGame Function is called when the win condition is met
function winGame() {
    startBtn.disabled = false;
    startBtn.classList.remove('hide');
    setLastScore();
    finishTime = timerCount;
    initialsForm.classList.remove('hide');
}

var finishTime;

// The timeOut function is called when the timer reached 0
function timeOut() {
    startBtn.disabled = false;
    setLastScore();
    // Need function to add remaining time as score
}

var lastScoreArray = [];
var highScoreArray = [];


// Sets the Last Score Achieved by Player
function setLastScore() {
    lastScore.textContent = lastScoreCounter;
    lastScoreArray.push(lastScoreCounter);
    localStorage.setItem("lastScoreCount", lastScoreArray);
}


// Sets the Highest Score Achieved by Player
function setHighScore() {
    highScore.textContent = highScoreCounter;
    highScoreArray.push(highScoreCounter)
    localStorage.setItem("highScoreCount", highScoreArray);
}

// Gets Last Score Player Achieved to Display
function getLastScore() {
    var storedLastScore = localStorage.getItem("lastScoreCount");
    if (storedLastScore === null) {
        lastScoreCounter = 0;
    } else {
        lastScoreCounter = storedLastScore;
    }
    lastScore.textContent = lastScoreCounter;
}

// Gets Highest Score Player Achieved to Display
function getHighScore() {
    var storedHighScore = localStorage.getItem("highScoreCount");
    if (storedHighScore === null) {
        highScoreCounter = 0;
    } else {
        highScoreCounter = storedHighScore;
    }
    highScore.textContent = highScoreCounter;
}

// Button to Reset Scores
var resetScoreButton = document.querySelector(".reset-score-button");

function resetScores() {
    // Resets the last score and high score
    lastScoreCounter = 0;
    highScoreCounter = 0;
    // Renders last score and high score counts and sets them into client storage
    setLastScore()
    setHighScore()
}

// Attaches Click Event Listener to Reset Scores
resetScoreButton.addEventListener("click", resetScores);

// var userInitials = prompt("Please enter your initials");

// if (winGame) {
//     var initials = document.createElement(userInitials);
//     initials.textContent = userInitials;
//     document.body.appendChild(initials);
// }


// I would like it...
// Stop the clock and display it as the Player's score at the end of the game
// Have an input for the player's initials and save their score 
// I want a reset score function/button

// Look into how to manipulate DOM
// Look how to create elements using the DOM
// Create an input field to save initials for highscore
// Add the initials for high score into the local storage
// For high scores, learn how to output local storage