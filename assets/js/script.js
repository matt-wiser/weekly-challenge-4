var startButtonEl = document.getElementById("game-start");
var timerEl = document.getElementById("timer");
var contentAreaEl = document.getElementById("main-content");
var questions = {
    question1 : { questionText : "Commonly used data types do NOT include:", answer1 : "strings", answer2 : "booleans", answer3 : "numbers", answer4 : "alerts", correctAnswer: 4},
    question2 : { questionText : "The condition in an if/else statement is enclosed in:", answer1 : "quotes", answer2 : "curly brackets", answer3 : "parenthesis", answer4 : "square brackets", correctAnswer: 3},
    question3 : { questionText : "Arrays in Javascript can be used to store:", answer1 : "numbers and strings", answer2 : "other arrays", answer3 : "booleans", answer4 : "all of the above", correctAnswer: 4}
};
var questionContainerEl = document.createElement("div").setAttribute("id", "question-container");
var questionTextEl = document.createElement("h1").setAttribute("id", "question-text");

function gameStart(){
    timerEl.innerText =  "75";
    var currentTime = parseInt(timerEl.innerText);
    var countdown = setInterval(function(){
        if (currentTime > 0) {
            currentTime--;
            console.log(currentTime);
            timerEl.innerText = currentTime;
        } else {
            clearInterval(countdown);
            gameEnd();
            return;
        }
    }, 1000)
    removeAllChildNodes(contentAreaEl);
    initializeQuestions();
}

function gameEnd(){
    console.log("Game has finished");
}

function initializeQuestions(){
    contentAreaEl.append(questionContainerEl);
    questionTextEl.innerText = questions.question1.questionText;
    questionContainerEl.appendChild(questionTextEl);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

startButtonEl.addEventListener("click", gameStart);