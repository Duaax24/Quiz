const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

const quiz = [
  {
    question: "Was ist die coolste Stadt in Deutschland?",
    answers: ["Berlin", "bremen", "Hamburg"],
    correct: 0
  },
  {
    question: "Wie nervig ist juliannn",
    answers: [
      "sehrrrrrrrr ",
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

  // Fortschritt updaten
  let progressPercent = (currentQuestion / quiz.length) * 100;
  progressBar.style.width = progressPercent + "%";
  progressText.innerText = "Frage " + (currentQuestion + 1) + " von " + quiz.length;

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
    questionEl.innerText = "";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";
    let message = "";
scoreEl.className = ""; // reset

if (score === quiz.length) {
    message = "🎉 Herzlichen Glückwunsch! Volle Punktzahl!";
    scoreEl.classList.add("good");
  
    createConfetti();
    drawConfetti();
  } else if (score >= quiz.length / 2) {
  message = "knapppp";
  scoreEl.classList.add("medium");
} else {
  message = "versuch’s nochmal";
  scoreEl.classList.add("bad");
}

scoreEl.innerText = message + "\nDein Score: " + score + " / " + quiz.length;
    // Fortschritt auf 100%
    progressBar.style.width = "100%";
    progressText.innerText = "Fertig!";

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

const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 5 + 2,
      color: "hsl(" + Math.random() * 360 + ", 100%, 50%)"
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();

    c.y += c.d;

    if (c.y > canvas.height) {
      confetti.splice(i, 1);
    }
  });

  requestAnimationFrame(drawConfetti);
}
