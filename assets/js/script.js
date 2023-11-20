var score = 0;
var container = document.querySelector("#container");
var quizContent = document.querySelector("#quizContent");
var questionTitle = document.querySelector("#qTitle")
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#start");

var questions = [
    {
        title: "Which of the following HTML tags would result in italicized text?",
        choices: ["< bold >", "< em >", "< i >", "< strong >"],
        answer: "< i >"
    },
    {
        title: "The first index of an array is: ",
        choices: ["0", "1", "9", "4"],
        answer: "0"
    },
    {
        title: "Which tag is used to create a hyperlink in HTML?",
        choices: ["< a >","< href > >","< link >", " < anchor >"],
        answer: "< a >"
    },

   {    title: "Which of the following is NOT a part of the CSS Box Model?",
        choices: ["< Margin >","< Outline >","< Padding >","<  Content >"],
        answer: "< Outline >"
    },
    {
        title: "What is the boolean output of the following statement?: 'three' === 3",
        choices: ["0", "undefined", "false", "true"],
        answer: "false"
    },
    {
        title: "Which of the following HTML tags would result in bold text?",
        choices: ["< bold >", "< em >", "< br >", "< strong >"],
        answer: "< strong >"
    },
    {
        title: "Which CSS property controls text size?",
        choices: ["text-size", "font-style", "font-size", "size"],
        answer: "font-size"
    },
    {
        title: "How do you add a comment in a JavaScript file?",
        choices: ["< !-- Comment -->", "//Comment", "/*Comment*/", "~Comment~"],
        answer: "//Comment"
    },
];
var questionIndex = 0;

var createUl = document.createElement("ul");
createUl.setAttribute("id", "optionsUl")

var timeInterval = 0;
var countdown = 120;
var penalty = 20;

// Randomize Question order with shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Event listener for the start button
startBtn.addEventListener("click", function() {
    if (timeInterval === 0) {
        // Shuffle the questions array before starting the quiz
        shuffleArray(questions);
        // Other timer and question setup logic remains unchanged
        // ...
    }
    newQuestion(questionIndex);
});

// Start Button click event

startBtn.addEventListener("click", function() {
    if (timeInterval === 0) {
        timeInterval = setInterval(function() {
            countdown--;
            timer.textContent = "Time: " + countdown;
            if (countdown <= 0) {
                clearInterval(timeInterval);
                theEnd();
            }
        }, 1000);
    }
    newQuestion(questionIndex)
});

// generates a new question
function newQuestion(questionIndex) {
    quizContent.innerHTML = "";
    createUl.innerHTML = "";
    var displayQuestion = document.createElement("h2");

    for (var i = 0; i < questions.length; i++) {
        displayQuestion.innerHTML = questions[questionIndex].title;
        var displayChoices = questions[questionIndex].choices;
        quizContent.appendChild(displayQuestion);
    }
    console.log(displayChoices);
    displayChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.innerHTML += "<button>" + newItem + "</button>";
        quizContent.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (checkAns));
    })
}

var i = 0;
var newDiv = document.createElement("div");
var feedback = document.createElement("h3");
newDiv.setAttribute("id", "newDiv");
// checks to see if selected answer is correct & inserts feedback (correct/incorrect)
function checkAns(event) {
        var choice = event.target;
        quizContent.appendChild(newDiv);
        newDiv.appendChild(feedback);
        var next = document.createElement("button");
        next.setAttribute("id", "nextButton");
        next.textContent = "Next Question";

// condition that selected answer is correct
    if (choice.textContent == questions[questionIndex].answer) {
        score++;
        feedback.textContent = "Correct! ✅";
        newDiv.appendChild(feedback);
        
        newDiv.appendChild(next);
        next.addEventListener("click", (nextQuestion));

//condition that the selected answer is incorrect
    } else {
        countdown = countdown - penalty;
        feedback.textContent = "Incorrect! ❌";
        newDiv.appendChild(feedback);
    }
}

// Decides whether to initiate final pages or to cycle through next question
function nextQuestion(event) {
    newDiv.innerHTML = "";
    questionIndex++;
    if (questionIndex >= questions.length) {
        theEnd();
    } else {
        newQuestion(questionIndex);

    }
}


function theEnd() {
    quizContent.innerHTML = "";
    timer.innerHTML = "";
// Sets up high score page
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Finished!"
    quizContent.appendChild(newH1);


// Calculation and display of final score
    if (countdown >= 0) {
        score = countdown;
        clearInterval(timeInterval);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizContent.appendChild(newP);
    } else {
        score = 0;
        var outOfTime = document.createElement("h2");
        outOfTime.textContent = "Time is up! ⌛";
        quizContent.appendChild(outOfTime);
        var newP = document.createElement("p");
        newP.textContent = "Your final score is: " + score;
        quizContent.appendChild(newP);
    }

// Initials submission box and button
    var initialsPrompt = document.createElement("label");
    initialsPrompt.setAttribute("for", "inputBox");
    initialsPrompt.textContent = "Enter your initials: ";
    quizContent.appendChild(initialsPrompt);

    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "inputBox")  
    inputBox.textContent = "";
    quizContent.appendChild(inputBox)
    
    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";
    quizContent.appendChild(submit);

function gameScoreSubmission() {
    var initials = inputBox.value;

    if (initials === "") {
        console.log("No initials entered")
        window.alert("Please enter your initials");
    } else {
        var finalScore = {
            initials: initials,
            score: score
        }
        // Storage of past scores
        var storeScores = localStorage.getItem("storeScores");
        if (storeScores === null) {
            storeScores = [];
        } else {
            storeScores = JSON.parse(storeScores);
        }
        storeScores.push(finalScore);
        var newScore = JSON.stringify(storeScores);
        localStorage.setItem("storeScores", newScore);
        window.location.replace("HighScoreRecord.html");
    }
}

// Click event for the submit button
submit.addEventListener("click", gameScoreSubmission);

// Keydown event for the input box
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        gameScoreSubmission();
    }
});
}