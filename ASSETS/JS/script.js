var startButton = document.querySelector(".startButton");

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
            sendMessage();
        }
    

    }, 1000);
}

// Start Button Event
startButton.addEventListener("click", setTime);


