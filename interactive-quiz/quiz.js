/* ---------- BASIC PAGE STYLE ---------- */
document.body.style.margin = "0";
document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.background =
  "linear-gradient(135deg,#141e30,#243b55)";
document.body.style.fontFamily = "Segoe UI, sans-serif";

/* ---------- QUESTIONS ---------- */

let questions = [
  {
    question: " who is the creator of JavaScript ?",
    options: ["Brendan Eich", "Mark Zuckerberg", "Bill Gates", "Elon Musk"],
    answer: 0
  },
  {
    question: "What is full from of HTML ?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup",
      "None"
    ],
    answer: 0
  },
  {
    question: "why we use CSS?",
    options: ["Logic", "Database", "Styling", "Server"],
    answer: 2
  },

];

let index = 0; // Current question number.//
let timer; 
let timeLeft = 10;
let userAnswers = [];

let box, questionEl, optionsDiv, timerEl, nextBtn;

/* ---------- BUTTON STYLE ---------- */
function styleBtn(btn) {
  Object.assign(btn.style, {
    padding: "12px 40px",
    margin: "12px",
    border: "none",
    borderRadius: "25px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s"
  });
}
  
/* ---------- WELCOME ---------- */
function showWelcome() {
  document.body.innerHTML = "";
 launchCelebration();
  box = document.createElement("div");
  Object.assign(box.style, {
    width: "420px",
    padding: "45px",
    background: "linear-gradient(135deg,#ffffff,#f3f6fb)",
    borderRadius: "26px",
    textAlign: "center",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
    transform: "scale(.7)",
    opacity: "0",
    transition: "0.6s"
  });
  
let h1 = document.createElement("h1");
h1.innerText = "🎯 Welcome to Quiz Zone";
Object.assign(h1.style, {
  fontSize: "34px",
  marginBottom: "20px",
  background: "linear-gradient(135deg,#667eea,#764ba2)",
  WebkitBackgroundClip: "text",
  fontWeight: "700px",
  letterSpacing: "1px"
});

let h3 = document.createElement("h3");
h3.innerText =
  "Test your knowledge of JavaScript, HTML, and CSS in a fun and timed quiz." +
  "⏰ Each question has limited time — think fast!" +
  "⚡ If time runs out, the question will auto-skip." +
  "📊 At the end, check your score and review all answers." +
  "Are you ready to challenge yourself? 🚀";

let btn = document.createElement("button");
btn.innerText = "Start Quiz 🚀";
styleBtn(btn);

Object.assign(btn.style, {
  fontSize: "16px",
  padding: "14px 38px",
  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5)"
});

btn.onmouseenter = () => {
  btn.style.transform = "scale(1.08)";
};
btn.onmouseleave = () => {
  btn.style.transform = "scale(1)";
};

btn.onclick = showQuiz;

box.append(h1, h3, btn);
document.body.appendChild(box);

  setTimeout(() => {
    box.style.opacity = "1";
    box.style.transform = "scale(1)";
  }, 100);

  
}

/* ---------- QUIZ ---------- */
function showQuiz() {
  document.body.innerHTML = "";

  box = document.createElement("div");
  Object.assign(box.style, {
    width: "430px",
    padding: "25px",
    background: "linear-gradient(135deg,#fdfbfb,#ebedee)",
    borderRadius: "22px",
    textAlign: "center",
    boxShadow: "0 25px 50px rgba(0,0,0,.45)"
  });

  timerEl = document.createElement("h3");
  timerEl.style.color = "#ff5722";

  questionEl = document.createElement("h2");
  questionEl.style.color = "#141e30";

  optionsDiv = document.createElement("div");

  nextBtn = document.createElement("button");
  nextBtn.innerText = "Next ➜";
  styleBtn(nextBtn);
  nextBtn.disabled = true;

  nextBtn.onclick = goNextAuto;

  box.append(timerEl, questionEl, optionsDiv, nextBtn);
  document.body.appendChild(box);

  loadQuestion();
}

/* ---------- LOAD QUESTION ---------- */
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  timerEl.innerText = "⏰ Time: 10s";
  timerEl.style.animation = "pulse 1s infinite";
  nextBtn.disabled = true;
  optionsDiv.innerHTML = "";

  questionEl.innerText = questions[index].question;
  startTimer();

  questions[index].options.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.innerText = opt;

    
    Object.assign(btn.style, {
      width: "100%",
      padding: "15px",
      margin: "12px 0",
      borderRadius: "16px",
      border: "none",
      fontSize: "15px",
      background: "linear-gradient(135deg,#36d1dc,#5b86e5)",
      color: "white",
      cursor: "pointer",
      transition: "0.25s"
    });

    btn.onmouseenter = () =>
      !btn.disabled && (btn.style.transform = "scale(1.04)");
    btn.onmouseleave = () =>
      !btn.disabled && (btn.style.transform = "scale(1)");

    btn.onclick = () => selectOption(btn, i);

    optionsDiv.appendChild(btn);
  });
}

/* ---------- OPTION SELECT ---------- */
function selectOption(btn, i) {
  if (btn.disabled) return;

  clearInterval(timer);
  userAnswers[index] = i;

  [...optionsDiv.children].forEach(b => {
    b.disabled = true;
    b.style.opacity = "0.5";
  });

  btn.style.opacity = "";
  btn.style.background = "linear-gradient(135deg,#667eea,#764ba2)";
  btn.style.transform = "scale(1.0)";
  btn.style.boxShadow = "0 0 10px rgba(36, 34, 33, 0.9)";

  nextBtn.disabled = false;
}

/* ---------- AUTO NEXT ---------- */
function goNextAuto() {
  index++;
  index < questions.length ? loadQuestion() : showResult();
}

/* ---------- TIMER ---------- */
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = "⏰ Time: " + timeLeft + "s";

    if (timeLeft <= 2) {
      timerEl.style.color = "#f63b1ebc";

    }

    if (timeLeft === 0) {
      clearInterval(timer);

      userAnswers[index] = null;

      [...optionsDiv.children].forEach(b => {
        b.disabled = true;
        b.style.opacity = "0.4";
      });

      setTimeout(goNextAuto, 500);
    }
  }, 1000);
}

/* ---------- RESULT ---------- */

function showResult() {
  box.innerHTML = "";

  // score calculate
  let score = userAnswers.filter(
    (a, i) => a === questions[i].answer
  ).length;

  let percentage = Math.round((score / questions.length) * 100);

  // motivation message
  let message = "";
  if (percentage === 100) {
    message = "🔥 Perfect! You are a Quiz Champion!";
  } else if (percentage >= 70) {
    message = "💪 Great job! Keep learning and growing!";
  } else if (percentage >= 40) {
    message = "😊 Good try! Practice more, success is near!";
  } else {
    message = "🚀 Don’t quit! Every try makes you better!";
  }

  // result card
  let card = document.createElement("div");
  card.innerHTML = `
    <h1>🎉 Quiz Completed 🎉</h1>
    <h2>Score: ${score} / ${questions.length}</h2>
    <p>Accuracy: ${percentage}%</p>
    <p>${message}</p>
  `;

  // card style
  card.style.background = "linear-gradient(135deg, #667eea, #43cea2)";
  card.style.padding = "30px";
  card.style.borderRadius = "20px";
  card.style.textAlign = "center";
  card.style.color = "white";
  card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
  card.style.animation = "popUp 0.8s ease";
  card.style.maxWidth = "420px";
  card.style.margin = "auto";

  // animation inject
  let style = document.createElement("style");
  style.innerHTML = `
    @keyframes popUp {
      0% {
        transform: scale(0.4);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  // buttons container
  let btnBox = document.createElement("div");
  btnBox.style.display = "flex";
  btnBox.style.justifyContent = "center";
  btnBox.style.gap = "15px";
  btnBox.style.marginTop = "25px";

  // view answer button
  let ansBtn = document.createElement("button");
  ansBtn.innerText = "📘 View All Answers";
  styleButton(ansBtn, "#218701ff", "#030303ff");
  ansBtn.onclick = showAllAnswers;

  // restart button
  let restart = document.createElement("button");
  restart.innerText = "🔄 Restart Quiz";
  styleButton(restart, "#e31e1eff", "black");
  restart.onclick = () => {
    index = 0;
    userAnswers = [];
    showWelcome();
     launchCelebration();
  };

  btnBox.append(ansBtn, restart);
  box.append(card, btnBox);

  launchCelebration();
}

// reusable button style
function styleButton(btn, bg, color) {
  btn.style.padding = "12px 18px";
  btn.style.border = "none";
  btn.style.borderRadius = "30px";
  btn.style.fontSize = "15px";
  btn.style.cursor = "pointer";
  btn.style.background = bg;
  btn.style.color = color;
  btn.style.transition = "0.3s";

  btn.onmouseover = () => {
    btn.style.transform = "scale(1.1)";
    btn.style.opacity = "0.9";
  };

  btn.onmouseout = () => {
    btn.style.transform = "scale(1)";
    btn.style.opacity = "1";
  };
}


/* ---------- ALL ANSWERS ---------- */
function showAllAnswers() {
  box.innerHTML = "<h1>📘 All Answers</h1>";

  /*  FIX FOR LONG QUESTIONS */
  box.style.maxHeight = "80vh";   // box screen ke andar rahe
  box.style.overflowY = "auto";   // andar scroll aaye
  
  questions.forEach((q, i) => {
    let card = document.createElement("div");
    let correct = q.answer;
    let user = userAnswers[i];

      Object.assign(card.style, {
  background:
    user === correct
      ? "linear-gradient(135deg,#43cea2,#185a9d)"
      : "linear-gradient(135deg,#ff758c,#ff7eb3)",
  color: "white",
  padding: "18px",
  margin: "15px 0",
  borderRadius: "18px",
  animation: "pop 0.5s",

  wordWrap: "break-word",
  overflowWrap: "break-word",
  whiteSpace: "normal"


    });

    card.innerHTML = `
      <b>Q${i + 1}. ${q.question}</b><br><br>
      🧠 Your: <b>${q.options[user] || "Not Selected"}</b><br>
      ✅ Correct: <b>${q.options[correct]}</b>
    `;

    box.appendChild(card);
    
  });

  let back = document.createElement("button");
  back.innerText = "⬅ Back";
  styleBtn(back,);
  back.onclick = showResult;
  box.appendChild(back);
 
  launchCelebration();
}

/* ---------- CELEBRATION ---------- */
function launchCelebration() {
  let style = document.createElement("style");
  style.innerHTML = `
    @keyframes pop {
      from { transform: scale(.8); opacity:0 }
      to { transform: scale(1); opacity:1 }
    }
    @keyframes pulse {
      0% { transform: scale(1) }
      50% { transform: scale(1.1) }
      100% { transform: scale(1) }
    }
    @keyframes confetti {
      to { transform: translateY(300px) rotate(360deg); opacity:0 }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < 20; i++) {
    let c = document.createElement("div");
    c.style.position = "fixed";
    c.style.top = "0";
    c.style.left = Math.random() * 100 + "vw";
    c.style.width = "10px";
    c.style.height = "10px";
    c.style.background = ["#ffeb3b","#4caf50","#03a9f4","#e91e63"][Math.floor(Math.random()*4)];
    c.style.animation = "confetti 1.5s linear";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1500);
  }
}

/* ---------- START ---------- */
showWelcome();
