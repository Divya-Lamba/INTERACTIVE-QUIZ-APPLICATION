const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correct: "Paris"
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correct: "JavaScript"
  },
  {
    question: "What color is the sky?",
    options: ["Green", "Blue", "Red", "Black"],
    correct: "Blue"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Mars"
  },
  {
    question: "Which of the following is a frontend framework?",
    options: ["Flask", "React", "Django", "Node.js"],
    correct: "React"
  },
  {
    question: "Who invented the lightbulb?",
    options: ["Newton", "Einstein", "Edison", "Tesla"],
    correct: "Edison"
  },
  {
    question: "HTML stands for?",
    options: ["HighText Machine Language", "HyperText Markup Language", "HyperTransfer Machine Language", "None"],
    correct: "HyperText Markup Language"
  },
  {
    question: "CSS is used for?",
    options: ["Adding logic", "Styling web pages", "Connecting to database", "Writing server code"],
    correct: "Styling web pages"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correct: "<a>"
  }
];


let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    answersEl.appendChild(btn);
  });

  feedbackEl.textContent = "";
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].correct;
  if (selected === correct) {
    feedbackEl.textContent = " Correct!";
    score++;
  } else {
    feedbackEl.textContent = " Wrong! Correct answer: " + correct;
  }

  scoreEl.textContent = `Score: ${score}`;
  Array.from(answersEl.children).forEach(btn => btn.disabled = true);
}

nextBtn.onclick = () => {
  // When quiz ends
questionEl.textContent = "Quiz Over!";

answersEl.innerHTML = "";
feedbackEl.textContent = `Final Score: ${score}/${quizData.length}`;
nextBtn.style.display = "none";

// Show bar chart
const canvas = document.getElementById("scoreChart");
canvas.style.display = "block";
const ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw bar (your score)
ctx.fillStyle = "#4caf50";
ctx.fillRect(50, 200 - score * 15, 100, score * 15);
ctx.fillText("Your Score", 50, 190 - score * 15);

// Draw bar (max score)
ctx.fillStyle = "#ddd";
ctx.fillRect(200, 50, 100, 150);
ctx.fillText("Max Score", 200, 40);

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    nextBtn.style.display = "block";  // Make sure Next button is visible every time a question loads

  } else {
    questionEl.textContent = " Quiz Over!";
    answersEl.innerHTML = "";
    feedbackEl.textContent = `Final Score: ${score}/${quizData.length}`;
    nextBtn.style.display = "none";
  }
  if (currentQuestion < quizData.length) {
  loadQuestion();
  nextBtn.style.display = "block";  // Make sure Next button is visible every time a question loads

} else {
  // Fill progress bar to 100% at end
  document.getElementById("progress").style.width = "100%";
  // show final score...
}

};
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}/${quizData.length}: ${q.question}`;
  answersEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    answersEl.appendChild(btn);
  });

  // Progress bar update
  const progress = document.getElementById("progress");
  const progressPercent = ((currentQuestion) / quizData.length) * 100;
  progress.style.width = `${progressPercent}%`;

  feedbackEl.textContent = "";
}


loadQuestion();
