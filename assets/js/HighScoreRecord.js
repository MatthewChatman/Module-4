var scoreContainer = document.querySelector("#quizContent");
var highScores = document.querySelector("#displayScores");
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");

backButton.addEventListener("click", function() {
    window.location.replace("index.html");
});

clearButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

var storeScores = localStorage.getItem("storeScores");
storeScores = JSON.parse(storeScores);


if (storeScores !== null) {
    for (var i = 0; i < storeScores.length; i++) {
        var addScore = document.createElement("li");
        addScore.setAttribute("id", "scoreLi");
        addScore.textContent = storeScores[i].initials + " " + storeScores[i].score;

        highScores.appendChild(addScore);
    }
};