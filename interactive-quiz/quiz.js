const content = document.getElementById("content") || document.getElementById("quiz-container") || document.body;

const questions = [
  {
    question: "Who is the creator of JavaScript?",
    options: ["Brendan Eich", "Mark Zuckerberg", "Bill Gates", "Elon Musk"],
    answer: 0,
  },
  {
    question: "What is the full form of HTML?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup",
      "None",
    ],
    answer: 0,
  },
  {
    question: "Why do we use CSS?",
    options: ["Logic", "Database", "Styling", "Server"],
    answer: 2,
  },
];

let index = 0;
let timer;
let timeLeft = 10;
let userAnswers = [];

let timerEl;
let questionEl;
let optionsDiv;
let nextBtn;
let progressFillEl;

function renderCard(innerHtml) {
  content.innerHTML = `
    <section class="quiz-card">
      ${innerHtml}
    </section>
  `;
  return content.querySelector(".quiz-card");
}

function showWelcome() {
  renderCard(`
    <h1 class="quiz-title">Welcome to Quiz Zone</h1>
    <p class="quiz-description">Test your knowledge of JavaScript, HTML, and CSS in a fast and fun challenge.</p>
    <p class="quiz-subtext">You get 10 seconds per question. If time runs out, the quiz automatically moves ahead.</p>
    <div class="action-row">
      <button id="start-btn" class="primary-btn glow">Start Quiz</button>
    </div>
  `);

  document.getElementById("start-btn").onclick = showQuiz;
}

function showQuiz() {
  renderCard(`
    <div class="progress-track" aria-hidden="true">
      <div class="progress-fill" id="progress-fill"></div>
    </div>
    <p class="quiz-progress" id="quiz-progress"></p>
    <p class="quiz-timer" id="quiz-timer">Time Left: 10s</p>
    <h2 class="quiz-question" id="quiz-question"></h2>
    <div class="option-wrap" id="quiz-options"></div>
    <div class="action-row">
      <button id="next-btn" class="primary-btn" disabled>Next Question</button>
    </div>
    <p class="timeout-msg" id="timeout-msg" hidden>Time is up. Loading the next question...</p>
  `);

  timerEl = document.getElementById("quiz-timer");
  questionEl = document.getElementById("quiz-question");
  optionsDiv = document.getElementById("quiz-options");
  nextBtn = document.getElementById("next-btn");
  progressFillEl = document.getElementById("progress-fill");

  nextBtn.onclick = goNextAuto;
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;

  const progressEl = document.getElementById("quiz-progress");
  const timeoutMsg = document.getElementById("timeout-msg");

  if (progressEl) {
    progressEl.textContent = `Question ${index + 1} / ${questions.length}`;
  }
  if (progressFillEl) {
    progressFillEl.style.width = `${((index + 1) / questions.length) * 100}%`;
  }

  if (timeoutMsg) {
    timeoutMsg.hidden = true;
  }

  timerEl.textContent = "Time Left: 10s";
  timerEl.style.color = "#ea580c";
  nextBtn.disabled = true;
  optionsDiv.innerHTML = "";

  questionEl.textContent = questions[index].question;

  questions[index].options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.dataset.index = String(i);
    btn.textContent = opt;
    btn.style.animationDelay = `${i * 0.08}s`;
    btn.onclick = () => selectOption(btn, i);
    optionsDiv.appendChild(btn);
  });

  startTimer();
}

function selectOption(clickedBtn, selectedIndex) {
  if (clickedBtn.disabled) return;

  clearInterval(timer);
  userAnswers[index] = selectedIndex;
  const correctIndex = questions[index].answer;

  [...optionsDiv.children].forEach((btn) => {
    btn.disabled = true;
    if (Number(btn.dataset.index) === correctIndex) {
      btn.classList.add("is-correct");
    } else if (btn !== clickedBtn) {
      btn.style.opacity = "0.7";
    }
  });

  clickedBtn.classList.add("selected");
  if (selectedIndex !== correctIndex) {
    clickedBtn.classList.add("is-wrong");
  }
  nextBtn.disabled = false;
}

function goNextAuto() {
  index += 1;
  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft -= 1;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 3) {
      timerEl.style.color = "#dc2626";
    }

    if (timeLeft === 0) {
      clearInterval(timer);
      userAnswers[index] = null;

      [...optionsDiv.children].forEach((btn) => {
        btn.disabled = true;
        btn.style.opacity = "0.6";
      });

      const timeoutMsg = document.getElementById("timeout-msg");
      if (timeoutMsg) {
        timeoutMsg.hidden = false;
      }

      setTimeout(goNextAuto, 700);
    }
  }, 1000);
}

function showResult() {
  clearInterval(timer);

  const score = userAnswers.filter((a, i) => a === questions[i].answer).length;
  const percentage = Math.round((score / questions.length) * 100);

  let message = "";
  if (percentage === 100) {
    message = "Perfect! You are a Quiz Champion!";
  } else if (percentage >= 70) {
    message = "Great job! Keep learning and growing!";
  } else if (percentage >= 40) {
    message = "Good try! Practice more, success is near!";
  } else {
    message = "Do not quit. Every try makes you better!";
  }

  renderCard(`
    <h1 class="quiz-title">Quiz Completed</h1>
    <div class="score-pill">${percentage}%</div>
    <p class="quiz-description"><strong>Score:</strong> ${score} / ${questions.length}</p>
    <p class="quiz-description"><strong>Accuracy:</strong> ${percentage}%</p>
    <p class="quiz-subtext">${message}</p>
    <div class="action-row">
      <button id="answers-btn" class="primary-btn">Review Answers</button>
      <button id="restart-btn" class="primary-btn glow">Play Again</button>
    </div>
  `);

  document.getElementById("answers-btn").onclick = showAllAnswers;
  document.getElementById("restart-btn").onclick = () => {
    index = 0;
    userAnswers = [];
    showWelcome();
  };
}

function showAllAnswers() {
  const listHtml = questions
    .map((q, i) => {
      const user = userAnswers[i];
      const correct = q.answer;
      const stateClass = user === correct ? "correct" : "wrong";

      return `
        <article class="answer-item ${stateClass}" style="animation-delay:${i * 0.06}s">
          <div><strong>Q${i + 1}. ${q.question}</strong></div>
          <div>Your: <strong>${q.options[user] || "Not Selected"}</strong></div>
          <div>Correct: <strong>${q.options[correct]}</strong></div>
        </article>
      `;
    })
    .join("");

  renderCard(`
    <h1 class="quiz-title">All Answers</h1>
    <div class="quiz-list">${listHtml}</div>
    <div class="action-row">
      <button id="back-result" class="primary-btn">Back to Result</button>
      <button id="restart-from-answers" class="primary-btn glow">Play Again</button>
    </div>
  `);

  document.getElementById("back-result").onclick = showResult;
  document.getElementById("restart-from-answers").onclick = () => {
    index = 0;
    userAnswers = [];
    showWelcome();
  };
}

showWelcome();
