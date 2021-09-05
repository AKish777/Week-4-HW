var rulesEl = document.querySelector(".rules");
var startBtn = document.querySelector(".start");
var timerEl = document.querySelector(".timer");
var scoreEl = document.querySelector(".score");
var quizEl = document.querySelector(".quiz");
var questionEl = document.querySelector("#question");
var plusPoints = 10;
var minusPoints = 10;
var submitBtn = document.querySelector(".submit");
var gameOverEl = document.querySelector("#gameover");
var resultsEl = document.querySelector("#results");
var initials = document.querySelector("#initials");
var scoreList = document.querySelector(".scorelist");
var list = document.querySelector(".list");

var questions = [
  {
    question: "The condition in an if / else statement is enclosed within ______",
    choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    correctAnswer: "3. parentheses",
  },
  {
    question: "What is the correct syntax for referring to an external script called `xxx.js`?:",
    choices: ["1. <script name='xxx.js'>", "2.  <script src='xxx.js'>", "3.  <script href='xxx.js'>", "4. All of the above"],
    correctAnswer: "2.  <script src='xxx.js'>",
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    choices: ['1. msg("Hello World");', '2. alertBox("Hello World");', '3. alert("Hello World");', "4. All of the above"],
    correctAnswer: '3. alert("Hello World");',
  },
  {
    question: "Arrays in jJavaScript can be used to store _______",
    choices: ["1. numbers and strings", "other arrays", "3. booleans", "4. all of the above"],
    correctAnswer: "4. all of the above",
  },
  {
    question: "Which is the correct syntax for displaying data in the console?",
    choices: ["1. console.log();", "2. console.log[];", "3. log.console();", "4. console.log;"],
    correctAnswer: "1. console.log();",
  },
];

var timer;
var timeStart = 60;
var lastQuestion = questions.length;
var currentQuestion = 0;
var totalPoints = 0;
var correct;
var penalty = 5;

quizEl.style.display = "none";
scoreList.style.display = "none";

function startQuiz() {
  rulesEl.style.display = "none";
  generateQuiz();
  timer = setInterval(function () {
    timeStart--;
    timerEl.textContent = "Time left: " + timeStart;
    if (timeStart <= 0) {
      gameOver();
      quizEl.style.display = "none";
    }
  }, 1000);
}

function generateQuiz() {
  var q = questions[currentQuestion];
  var choicesDiv = document.querySelector(".choices");
  choicesDiv.innerHTML = "";
  questionEl.innerHTML = q.question;
  q.choices.forEach(function (choice) {
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choiceBtn.setAttribute("value", choice);
    choiceBtn.onclick = checkAnswer;
    choicesDiv.appendChild(choiceBtn);
  });
  quizEl.style.display = "block";
}

function showHighScore() {
  list.innerHTML = ""
  rulesEl.style.display = "none";
  quizEl.style.display = "none";
  gameOverEl.style.display = "none";
  scoreList.style.display = "block";
  displayHighscores();
}

function clearScore() {
  window.localStorage.clear();
  list.textContent = "";
}

function checkAnswer() {
  console.log(this);
  correct = questions[currentQuestion].correctAnswer;
  console.log(correct, currentQuestion);
  console.log(totalPoints);

  if (this.value === correct) {
    totalPoints = totalPoints + plusPoints;
    resultsEl.textContent = "Correct!";
    setTimeout(function () {
      resultsEl.textContent = "";
    }, 500);
  } else {
    resultsEl.textContent = "Wrong!";
    setTimeout(function () {
      resultsEl.textContent = "";
    }, 500);
    timeStart = timeStart - penalty;
    totalPoints = totalPoints - minusPoints;
  }

  currentQuestion++;
  if (currentQuestion === questions.length) {
    gameOver();
    quizEl.style.display = "none";
  } else {
    generateQuiz();
  }
}

function gameOver() {
  gameOverEl.classList.remove("hide");
  if (timeStart === 0) {
    timerEl.textContent = "Time's up!";
  } else {
    timerEl.textContent = "";
  }
  clearInterval(timer);
  if (timeStart >= 0) {
    scoreEl.innerHTML = "";
    scoreEl.textContent = "Your final score is: " + totalPoints;
    quizEl.style.display = "none";
  }
}

submitBtn.onclick = highScore;

function highScore() {
  var savedHighscores = JSON.parse(localStorage.getItem("savedScores")) || [];
  var scoreObj = {
    name: initials.value.trim().toUpperCase(),
    score: totalPoints,
  };
  gameOverEl.style.display = "none";
  scoreList.style.display = "block";

  console.log(scoreObj);
  savedHighscores.push(scoreObj);
  localStorage.setItem("savedScores", JSON.stringify(savedHighscores));
  displayHighscores();
}

function displayHighscores() {
  var highscores = JSON.parse(localStorage.getItem("savedScores")) || [];

  for (i = 0; i < highscores.length; i++) {
    var hsEntry = document.createElement("li");
    hsEntry.textContent =
      highscores[i].name + ":" + highscores[i].score;
    list.appendChild(hsEntry);
  }
}



console.log(initials.value);
startBtn.addEventListener("click", startQuiz);