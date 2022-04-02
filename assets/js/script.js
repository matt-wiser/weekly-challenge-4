var startButtonEl = document.getElementById("game-start");
var timerEl = document.getElementById("timer");
var contentAreaEl = document.getElementById("main-content");

var questions = [
    { questionText : "Commonly used data types do NOT include:", answer1: { answer : "strings", isCorrect : false }, answer2: {answer : "booleans", isCorrect : false } , answer3: { answer : "numbers", isCorrect: false}, answer4: {answer : "alerts", isCorrect: true} }, 
    { questionText : "The condition in an if/else statement is enclosed in:", answer1: {answer : "quotes", isCorrect : false }, answer2: {answer : "curly brackets", isCorrect : false}, answer3: { answer : "parenthesis", isCorrect : true}, answer4: {answer : "square brackets", isCorrect : false} },
    { questionText : "Arrays in Javascript can be used to store:", answer1: {answer : "numbers and strings", isCorrect : false}, answer2: { answer : "other arrays", isCorrect : false}, answer3: { answer : "booleans", isCorrect : false }, answer4: { answer : "all of the above", isCorrect : true} }
];
var currentTime = 75;
var questionIterator = 0;

var questionContainerEl = document.createElement("div")
questionContainerEl.setAttribute("id", "question-container");
var questionTextEl = document.createElement("h1")
questionTextEl.setAttribute("id", "question-text");

var answerButton1El = document.createElement("button");
answerButton1El.setAttribute("type", "button");
answerButton1El.setAttribute("class", "answer-button");

var answerButton2El = document.createElement("button");
answerButton2El.setAttribute("type", "button");
answerButton2El.setAttribute("class", "answer-button");

var answerButton3El = document.createElement("button");
answerButton3El.setAttribute("type", "button");
answerButton3El.setAttribute("class", "answer-button");

var answerButton4El = document.createElement("button");
answerButton4El.setAttribute("type", "button");
answerButton4El.setAttribute("class", "answer-button");



function gameStart(){
    timerEl.innerText =  currentTime;
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
    questionContainerEl.append(questionTextEl);
    questionContainerEl.append(answerButton1El);
    questionContainerEl.append(answerButton2El);
    questionContainerEl.append(answerButton3El);
    questionContainerEl.append(answerButton4El);
    
    var answerButtonsEl = document.querySelectorAll(".answer-button");
    addAnswerClickListener(answerButtonsEl);

    updateQuestionContent();
}

function updateQuestionContent(){
    questionTextEl.innerText = questions[questionIterator].questionText;
    answerButton1El.innerText = questions[questionIterator].answer1.answer;
    answerButton2El.innerText = questions[questionIterator].answer2.answer;
    answerButton3El.innerText = questions[questionIterator].answer3.answer;
    answerButton4El.innerText = questions[questionIterator].answer4.answer;    
}

function assessAnswer(clickedElement){
    console.log("an answer button has been clicked");
    console.log(clickedElement);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addAnswerClickListener(answerButtonsEl){
    answerButtonsEl.forEach(element => {
        element.addEventListener("click", function(event){
            assessAnswer(event.target);
        });
    });
}

startButtonEl.addEventListener("click", gameStart);
