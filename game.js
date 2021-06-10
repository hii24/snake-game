const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("overlay-text");

const CELL = 20;
const COLS = canvas.width / CELL;
const ROWS = canvas.height / CELL;

const STATES = { READY: "ready", RUNNING: "running", PAUSED: "paused", OVER: "over" };

let snake, dir, nextDir, food, score, best, lastMove, state;

best = Number(localStorage.getItem("snake-best") || 0);
bestEl.textContent = best;

function reset() {
  snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  dir = { x: 1, y: 0 };
  nextDir = dir;
  score = 0;
  scoreEl.textContent = score;
  spawnFood();
  state = STATES.RUNNING;
  overlay.classList.add("hidden");
  lastMove = 0;
}

function spawnFood() {
  while (true) {
    const x = Math.floor(Math.random() * COLS);
    const y = Math.floor(Math.random() * ROWS);
    if (!snake.some((s) => s.x === x && s.y === y)) {
      food = { x, y };
      return;
    }
  }
}

function step() {
  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) return gameOver();
  if (snake.some((s) => s.x === head.x && s.y === head.y)) return gameOver();

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    if (score > best) {
      best = score;
      bestEl.textContent = best;
      localStorage.setItem("snake-best", String(best));
    }
    spawnFood();
  } else {
    snake.pop();
  }
}

function gameOver() {
  state = STATES.OVER;
  overlayText.textContent = "Game Over";
  overlay.classList.remove("hidden");
}

function draw() {
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#dc2626";
  ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);

  snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? "#00f7ff" : "#0d8b94";
    ctx.fillRect(segment.x * CELL + 1, segment.y * CELL + 1, CELL - 2, CELL - 2);
  });
}

function loop(now) {
  if (state === STATES.RUNNING && now - lastMove > 100) {
    step();
    lastMove = now;
  }
  draw();
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":    if (dir.y === 0) nextDir = { x: 0, y: -1 }; break;
    case "ArrowDown":  if (dir.y === 0) nextDir = { x: 0, y: 1 }; break;
    case "ArrowLeft":  if (dir.x === 0) nextDir = { x: -1, y: 0 }; break;
    case "ArrowRight": if (dir.x === 0) nextDir = { x: 1, y: 0 }; break;
    case " ":
      if (state === STATES.OVER) reset();
      else if (state === STATES.RUNNING) { state = STATES.PAUSED; overlayText.textContent = "Paused"; overlay.classList.remove("hidden"); }
      else if (state === STATES.PAUSED) { state = STATES.RUNNING; overlay.classList.add("hidden"); }
      break;
  }
});

reset();
requestAnimationFrame(loop);
