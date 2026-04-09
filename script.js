const quiz = [
  {
    question: "Was ist die beste Stadt in Deutschland?",
    answers: ["Berlin", "München", "Hamburg"],
    correct: 0
  },
  {
    question: "Wie nervig ist juliannn.",
    answers: [
      "sehrrrrrrrr nervig",
      "sehr ",
      "richtig nervig "
    ],
    correct: 0
  },
  {
    question: "2 + 2 = ?",
    answers: ["3", "4", "5"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
  answered = false;
  nextBtn.style.display = "none";

  const q = quiz[currentQuestion];
  questionEl.innerText = q.question;

  answersEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;

    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      const buttons = answersEl.querySelectorAll("button");

      buttons.forEach((b, i) => {
        if (i === q.correct) {
          b.classList.add("correct");
        } else {
          b.classList.add("wrong");
        }
        b.disabled = true;
      });

      if (index === q.correct) {
        score++;
      }

      nextBtn.style.display = "block";
    });

    answersEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    questionEl.innerText = "Quiz beendet!";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.innerText = "Dein Score: " + score + " / " + quiz.length;

    restartBtn.style.display = "block";
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreEl.innerText = "";
  restartBtn.style.display = "none";

  loadQuestion();
});

// Start
loadQuestion();