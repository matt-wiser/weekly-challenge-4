var startButtonEl = document.getElementById("game-start");
var timerEl = document.getElementById("timer");

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
            console.log("timer finished");
            return;
        }
    }, 1000)
}


startButtonEl.addEventListener("click", gameStart);