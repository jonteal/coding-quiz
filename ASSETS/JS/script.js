// Assign variables to all components that will change throughout the quiz

// Pseudo code the quiz before really focusing on the JS

// 

// Create questions as objects
// {
//     // question: "Sample answer 1",
//     // choice1: ""
    
// }


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
