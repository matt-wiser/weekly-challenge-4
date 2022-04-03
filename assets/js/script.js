var startButtonEl = document.getElementById("game-start");
var timerEl = document.getElementById("timer");
var contentAreaEl = document.getElementById("main-content");
var highScoresEl = document.getElementById("high-scores");

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
        if (currentTime > 0 && questionIterator < 3) {
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
    removeAllChildNodes(contentAreaEl);
    var gameEndEl = document.createElement("h2");
    gameEndEl.setAttribute("id", "game-end");
    gameEndEl.textContent = "All done!"
    contentAreaEl.append(gameEndEl);

    var scoreInfoEl = document.createElement("h3");
    scoreInfoEl.setAttribute("id", "score-info");
    scoreInfoEl.textContent = "Your Final Score Is " + currentTime;
    contentAreaEl.append(scoreInfoEl);

    var initialsFormEl = document.createElement("form");
    
    var initialsLabelEl = document.createElement("label");
    initialsLabelEl.setAttribute("for", "initials");
    initialsLabelEl.setAttribute("id", "initials-label");
    initialsLabelEl.textContent = "Enter Your Initials";
    initialsFormEl.append(initialsLabelEl);

    var initialsInputEl = document.createElement("input");
    initialsInputEl.setAttribute("type", "text");
    initialsInputEl.setAttribute("name", "initials");
    initialsInputEl.setAttribute("id", "initials-text");
    initialsFormEl.append(initialsInputEl);

    var initialsSubmitEl = document.createElement("input");
    initialsSubmitEl.setAttribute("id", "initials-submit");
    initialsSubmitEl.setAttribute("type", "submit");
    initialsSubmitEl.setAttribute("value", "submit");
    initialsFormEl.append(initialsSubmitEl);

    contentAreaEl.append(initialsFormEl);
    
    initializeSubmitListener();
}

function initializeSubmitListener() {
    var submitButton = document.querySelector("#initials-submit");
    submitButton.addEventListener("click", writeToStorage);
}

function writeToStorage() {
    if (localStorage.getItem("high-scores")) {
        var highScoreArray = localStorage.getItem("high-scores");
        highScoreArray = JSON.parse(highScoreArray);
        console.log(highScoreArray);
        var initials = document.getElementById('initials-text').value;
        console.log('intitials', initials);

        var highScoreInfo = {
            initials: initials,
            score: currentTime
        }
        highScoreArray.push(highScoreInfo);
        localStorage.setItem("high-scores", JSON.stringify(highScoreArray));
    } else {
        var highScoreArray = [];
        var initials = document.getElementById('initials-text').value;
        console.log('intitials', initials);
        var highScoreInfo = {
            initials: initials,
            score: currentTime
        }
        highScoreArray.push(highScoreInfo);
        localStorage.setItem("high-scores", JSON.stringify(highScoreArray));
    }
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
    var selectedAnswer = clickedElement.textContent;
    var currentQuestion = questions[questionIterator];
    console.log('selectedAnswer: ', selectedAnswer);

    for (const key in currentQuestion) {
        if (selectedAnswer === currentQuestion[key].answer && currentQuestion[key].isCorrect) {
            questionIterator++
            if (questionIterator < 3) {
                updateQuestionContent();            
            } else {
                gameEnd();
            }

        } if (selectedAnswer === currentQuestion[key].answer && !currentQuestion[key].isCorrect) {
            currentTime = currentTime - 10;
        } 
    }
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

function populateHighScores(){
    removeAllChildNodes(contentAreaEl);
    
    if (localStorage.getItem("high-scores")) {
        var highScoreArray = JSON.parse(localStorage.getItem("high-scores"));
    
        highScoreArray.sort((a, b) => {
            return b.score - a.score;
        })    

        var highScoreTitleEl = document.createElement("h2");
        highScoreTitleEl.textContent = "High Scores";
        contentAreaEl.append(highScoreTitleEl);

        for (let i = 0; i < highScoreArray.length; i++) {
            var highScoreEl = document.createElement("p");
            var scoreCount = i+1;
            highScoreEl.setAttribute("class", "high-score");
            highScoreEl.textContent = scoreCount + ". " + highScoreArray[i].initials + " - " + highScoreArray[i].score;
            contentAreaEl.append(highScoreEl); 
        }

        var goBackEl = document.createElement("a");
        goBackEl.setAttribute("id", "go-back");
        goBackEl.setAttribute("href", "./index.html");
        goBackEl.setAttribute("class", "button");
        goBackEl.textContent = "Return to Home Page";
        contentAreaEl.append(goBackEl);
        
        var clearDataEl = document.createElement("a");
        clearDataEl.setAttribute("id", "data-clear");
        clearDataEl.setAttribute("class", "button");
        clearDataEl.setAttribute("href", "#");
        clearDataEl.textContent = "Clear High Scores";
        contentAreaEl.append(clearDataEl);

        setClearDataListener(clearDataEl);
    } else {
        var highScoreTitleEl = document.createElement("h2");
        highScoreTitleEl.textContent = "High Scores";
        contentAreaEl.append(highScoreTitleEl);

        var noHighScoresEl = document.createElement("p");
        noHighScoresEl.setAttribute("class", "high-score");
        noHighScoresEl.textContent = "No High Scores to Display, please play a game!";
        contentAreaEl.append(noHighScoresEl);

        var goBackEl = document.createElement("a");
        goBackEl.setAttribute("id", "go-back");
        goBackEl.setAttribute("href", "./index.html");
        goBackEl.setAttribute("class", "button");
        goBackEl.textContent = "Return to Home Page";
        contentAreaEl.append(goBackEl);
        
        var clearDataEl = document.createElement("a");
        clearDataEl.setAttribute("id", "data-clear");
        clearDataEl.setAttribute("href", "#");
        clearDataEl.setAttribute("class", "button");
        clearDataEl.textContent = "Clear High Scores";
        contentAreaEl.append(clearDataEl);

        setClearDataListener(clearDataEl);
    }
}

function setClearDataListener(clearDataEl) {
    clearDataEl.addEventListener("click", clearData)
}

function clearData(){
    localStorage.removeItem("high-scores");
    populateHighScores();
}

startButtonEl.addEventListener("click", gameStart);
highScoresEl.addEventListener("click", populateHighScores);
