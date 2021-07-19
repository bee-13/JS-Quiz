const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


let questions = [
  {
    question: "The best way to dress for success is to...",
    choice1: "Dress comfortably",
    choice2: "Wear a formal suit",
    choice3: "Bring a sport coat, in case you need it",
    choice4: "Be trendy",
    answer: 2
  },
  {
    question:
      "What is the one thing you don't want to do during the first interview?",
    choice1: "Negotiate pay",
    choice2: "Connect with the interviewer",
    choice3: "Communicate why you are a good fit",
    choice4: "Close by arranging the next interview",
    answer: 1
  },
  {
    question: "How long does it normally take for the interviewer to determine whether you are a good match for the company?",
    choice1: "5 Mins",
    choice2: "20 Mins",
    choice3: "30 Mins",
    choice4: "At the conclusion of the interview",
    answer: 1
  },
  {
    question: "What should you NOT do to prepare for an interview?",
    choice1: "Research the company",
    choice2: "Learn the company's concern and problems",
    choice3: "Practice top interview questions and answers",
    choice4: "Memorize key answers to interview questions",
    answer: 4
  },
  {
    question: "Traditional interviews have only a 10% accuracy rate as predictors of future performance. Behavioral interviews have a ________ % accuracy rate.",
    choice1: "3%",
    choice2: "25%",
    choice3: "55%",
    choice4: "75%",
    answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    else if(classToApply === "incorrect"){
        timeleft -= 5;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

//-----------timer------------//
var timer = document.querySelector(".time");
var timeleft = 80;

function timeCounter() {
    var timerInterval = setInterval(function() {
        timeleft--;
        timer.textContent = timeleft;

        if(timeleft === 0) {
            localStorage.setItem("mostRecentScore", score);
            return window.location.assign("end.html");
        }
    }, 1000);
}

timeCounter();

startGame();