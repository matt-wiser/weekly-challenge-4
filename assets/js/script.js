var startButtonEl = document.getElementById("game-start");
var timerEl = document.getElementById("timer");

function gameStart(){
    var timer = document.getElementById("timer");
    timer = parseInt(timer);
    timerLogic(timer);
}

function timerLogic(timer){
    timerEl.innerText =  "5";
    var currentTime = parseInt(timerEl.innerText);
    var countdown = setInterval(function(){
        if (currentTime > 0) {
            currentTime--;
            console.log(currentTime);
            timerEl.innerText = currentTime;
        } else {
            clearInterval(countdown);
            console.log("timer finished");
            return;
        }
    }, 1000)
}

startButtonEl.addEventListener("click", gameStart);