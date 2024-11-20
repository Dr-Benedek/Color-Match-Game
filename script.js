const colors = ["red", "blue", "yellow", "green", "black", "brown"];
let score = 0;
let multiplier = 1;
let meter = 0;
let visible = false;
let countdownInterval;
let gamesrun = false;

const leftCard = document.getElementById("left-card");
const rightCard = document.getElementById("right-card");
const scoreDisplay = document.getElementById("score");
const multiplierDisplay = document.getElementById("multiplier");
const meterFill = document.getElementById("meter-fill");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
function updateCards() {
  const leftColor = getRandomColor();
  const rightColor = getRandomColor();
  const fontColor = colors[Math.floor(Math.random() * colors.length)];

  leftCard.textContent = leftColor;
  rightCard.textContent = rightColor;
  rightCard.style.color = fontColor;

  return leftColor === fontColor;
}

let correctAnswer = updateCards();

function handleAnswer(answer) {
  if(!gamesrun) return;
  if (answer === correctAnswer) {
    score += 50 * multiplier;
    meter++;
    if (meter >= 4) {
      multiplier = Math.min(multiplier + 1, 10);
      meter = 0;
    }
  } else {
    if (meter > 0) {
      meter = 0;
    } else {
      multiplier = Math.max(multiplier - 1, 1);
    }
  }

  scoreDisplay.textContent = score;
  multiplierDisplay.textContent = multiplier;
  meterFill.style.width = `${(meter / 4) * 100}%`;

  correctAnswer = updateCards();
}
document.addEventListener('keydown', async (event) => {
  const key = event.key;
  if (key == "ArrowLeft"){
    if(!gamesrun) return;
    handleAnswer(false);
    document.getElementById("no").style.opacity = 0.7;
    await sleep(200);
    document.getElementById("no").style.opacity = 1;
  }
  if (key == "ArrowRight"){
    if(!gamesrun) return;
    handleAnswer(true);
    document.getElementById("yes").style.opacity = 0.7;
    await sleep(200);
    document.getElementById("yes").style.opacity = 1;
  }
});

function startGame() {
  let countdownTimer = 20;
  if (gamesrun) return;
  gamesrun = true;
  clearInterval(countdownInterval)
  score = 0;
  multiplier = 1;
  meter = 0;
  scoreDisplay.textContent = score;
  multiplierDisplay.textContent = multiplier;
  meterFill.style.width = "0%";
  correctAnswer = updateCards();

  countdownInterval = setInterval(() => {
    countdownTimer--;
    document.getElementById('timer').textContent = countdownTimer;
    console.log(countdownTimer)
    if (countdownTimer <= 0) {
      clearInterval(countdownInterval);
      gamesrun = false;
    }
    }, 1000);

  Bezar();
}

function Bezar(){
  if (!visible) {
      document.getElementById("main").style.display = "block";
      visible = true;
  }else {
      document.getElementById("main").style.display = "none";
      visible = false;
  }
  };