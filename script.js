"use strict";

const clockMinDisplay = document.querySelector(".clock__minutes--display");
const clockSecDisplay = document.querySelector(".clock__seconds--display");
const btnAddMin = document.querySelector(".clock__minutes--increment");
const btnSubMin = document.querySelector(".clock__minutes--decrement");
const btnAddSec = document.querySelector(".clock__seconds--increment");
const clockBtns = [
  ...document.querySelector(".clock__minutes").children,
  ...document.querySelector(".clock__seconds").children,
].filter((el) => el.className.includes("clock__btn"));

const btnStart = document.querySelector(".btn--start");
const btnPause = document.querySelector(".btn--pause");
const btnReset = document.querySelector(".btn--reset");

let startTime;
let time = 120;
let timer;

const updateClock = function () {
  const min = String(Math.floor(time / 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);
  clockMinDisplay.textContent = `${min}`;
  clockSecDisplay.textContent = `${sec}`;
};

const startTimer = function () {
  const tick = function () {
    if (time === 0) {
      clearInterval(timer);
    }
    time--;
    updateClock();
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const pauseTimer = function () {
  clearInterval(timer);
  timer = 0;
};

const resetTimer = function () {
  clearInterval(timer);
  timer = 0;
  time = 120;
  updateClock();
};

const changeMin = function (option) {
  time = option === "increment" ? time + 60 : time - 60;
  updateClock();
};

const changeSec = function (option) {
  time = option === "increment" ? time + 1 : time - 1;
  updateClock();
};

btnStart.addEventListener("click", () => {
  if (!timer) {
    timer = startTimer();
  }
});

btnPause.addEventListener("click", pauseTimer);
btnReset.addEventListener("click", resetTimer);

clockBtns.forEach(function (el) {
  el.addEventListener("click", function (e) {
    if (e.target.className.includes("minutes")) {
      if (e.target.className.includes("increment")) {
        changeMin("increment");
      } else {
        changeMin("decrement");
      }
    } else {
      if (e.target.className.includes("increment")) {
        changeSec("increment");
      } else {
        changeSec("decrement");
      }
    }
  });
});
updateClock();
