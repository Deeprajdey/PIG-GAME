"use strict";
const p1 = document.querySelector(".player-1");
const p1Heading = document.querySelector(".player-1 .player-heading");
const p1Current = document.querySelector(".player-1 .current-score");
const p1CurrentBox = document.querySelector(".player-1 .player-current");
const p1Score = document.querySelector(".player-1 .player-score");
const p2 = document.querySelector(".player-2");
const p2Heading = document.querySelector(".player-2 .player-heading");
const p2Current = document.querySelector(".player-2 .current-score");
const p2CurrentBox = document.querySelector(".player-2 .player-current");
const p2Score = document.querySelector(".player-2 .player-score");
const dice = document.querySelector(".dice");
const reloadBtn = document.querySelector(".reload");
const holdBtn = document.querySelector(".hold");
const rollBtn = document.querySelector(".roll");

// STATE

const state = {
  current: [0, 0],
  highscore: [0, 0],
};

// RANDOM NUMBER GENERATOR
const random = (low, high) => {
  return Math.trunc(Math.random() * (high - low + 1)) + low;
};

// GAMEON
const playOn = (randomNum) => {
  if (randomNum === 1) {
    p1.classList.toggle("active");
    p2.classList.toggle("active");
    state.current = [0, 0];
    p1Current.textContent = 0;
    p2Current.textContent = 0;
    return;
  }
  if (p1.classList.contains("active")) {
    state.current[0] += randomNum;

    p1Current.textContent = state.current[0];
  }
  if (p2.classList.contains("active")) {
    state.current[1] += randomNum;

    p2Current.textContent = state.current[1];
  }
};

// 1.Roll Dice

rollBtn.addEventListener("click", () => {
  // 2. Gennerate a random number
  const randomNum = random(1, 6);
  // 3. Show the Dice
  if (!dice.classList.contains("show")) {
    dice.classList.add("show");
    dice.src = `./img/dice-${randomNum}.png`;
    dice.alt = `dice-${randomNum}`;
  }
  //4.Rotate the dice
  dice.classList.add("rotateDice");

  //5. Disabled the button
  rollBtn.disabled = true;
  reloadBtn.disabled = true;
  holdBtn.disabled = true;

  setTimeout(() => {
    dice.classList.remove("rotateDice");
    rollBtn.disabled = false;
    reloadBtn.disabled = false;
    holdBtn.disabled = false;
    dice.src = `./img/dice-${randomNum}.png`;
    dice.alt = `dice-${randomNum}`;
  }, 800);

  playOn(randomNum);
});

holdBtn.addEventListener("click", () => {
  if (p1.classList.contains("active")) {
    state.highscore[0] += state.current[0];
  }
  if (p2.classList.contains("active")) {
    state.highscore[1] += state.current[1];
  }
  p1Current.textContent = 0;
  p2Current.textContent = 0;
  p1Score.textContent = state.highscore[0];
  p2Score.textContent = state.highscore[1];
  if (state.highscore[0] >= 100) {
    p1.style.backgroundColor = "#495057";
    p1Heading.style.color = "#f03e3e";
    p1CurrentBox.style.display = "none";
    p1Score.textContent = "YOU WIN 100";
    p1Score.style.color = "#f03e3e";
    holdBtn.disabled = true;
    rollBtn.disabled = true;
    return;
  }
  if (state.highscore[1] >= 100) {
    p2.style.backgroundColor = "#495057";
    p2Heading.style.color = "#f03e3e";
    p2CurrentBox.style.display = "none";
    p2Score.textContent = "YOU WIN 100";
    p2Score.style.color = "#f03e3e";
    holdBtn.disabled = true;
    rollBtn.disabled = true;
    return;
  }
  p1.classList.toggle("active");
  p2.classList.toggle("active");
  state.current = [0, 0];
});

reloadBtn.addEventListener("click", () => {
  // ////////////////////
  p1.style.backgroundColor = "";
  p1Heading.style.color = "";
  p1CurrentBox.style.display = "";
  p1Score.textContent = "";
  p1Score.style.color = "";
  p2.style.backgroundColor = "";
  p2Heading.style.color = "";
  p2CurrentBox.style.display = "";
  p2Score.textContent = "";
  p2Score.style.color = "";
  holdBtn.disabled = false;
  rollBtn.disabled = false;
  dice.classList.remove("show");
  // ////////////
  state.current = [0, 0];
  state.highscore = [0, 0];
  p1Current.textContent = 0;
  p2Current.textContent = 0;
  p1Score.textContent = 0;
  p2Score.textContent = 0;
  p1.classList.remove("active");
  p1.classList.add("active");
  p2.classList.remove("active");
});
