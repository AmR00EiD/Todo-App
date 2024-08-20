var nameU = localStorage.getItem("username");
// console.log(nameU);

var username = document.getElementById("Data");
var newElement = document.createElement("h3");
newElement.textContent = nameU;
username.insertBefore(newElement, username.firstChild);

var timer;
var isRunning = false;
var startTime;
var savedTime = 0;

var startButton = document.getElementById("start-work-btn");
var breakButton = document.getElementById("take-break-btn");
var finishButton = document.getElementById("complete");
var timerDisplay = document.getElementById("timer-display");
var divBtns = document.getElementById("start-work");

// Load timer state from localStorage
window.addEventListener("load", () => {
  // Retrieve and apply button states from localStorage
  var btnStatus = JSON.parse(localStorage.getItem("btnStatus"));

  if (btnStatus) {
    if (btnStatus.startButton === "hide") {
      startButton.classList.add("hide");}
    else {startButton.classList.remove("hide");}

    if (btnStatus.breakButton === "hide") breakButton.classList.add("hide");
    else breakButton.classList.remove("hide");

    if (btnStatus.finishButton === "hide") finishButton.classList.add("hide");
    else finishButton.classList.remove("hide");
  }

  // Retrieve and apply timer state from localStorage
  var storedsavedTime = localStorage.getItem("savedTime");
  var storedIsRunning = localStorage.getItem("isRunning") === "true";
  var storedStartTime = localStorage.getItem("startTime");

  if (storedsavedTime) {
    savedTime = parseInt(storedsavedTime, 10);
  }
  if (storedIsRunning) {
    startTime = parseInt(storedStartTime, 10);
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }
  updateTimer();
});

startButton.addEventListener("click", startTimer);
breakButton.addEventListener("click", pauseTimer);
finishButton.addEventListener("click", resetTimer);

function startTimer() {
  startTime = Date.now() - savedTime;
  localStorage.setItem("startTime", startTime);
  localStorage.setItem("isRunning", true);
  isRunning = true;
  timer = setInterval(updateTimer, 1000);

  startButton.classList.add("hide");
  breakButton.classList.remove("hide");
  finishButton.classList.remove("hide");

  localStorage.setItem(
    "btnStatus",
    JSON.stringify({
      startButton: "hide",
      breakButton: "show",
      finishButton: "show",
    })
  );
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
  savedTime = Date.now() - startTime;
  localStorage.setItem("savedTime", savedTime);
  localStorage.setItem("isRunning", false);

  startButton.classList.remove("hide");
  breakButton.classList.add("hide");

  localStorage.setItem(
    "btnStatus",
    JSON.stringify({
      startButton: "show",
      breakButton: "hide",
      finishButton: "show",
    })
  );
}

function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  savedTime = 0;
  localStorage.removeItem("savedTime");
  localStorage.removeItem("startTime");
  localStorage.setItem("isRunning", false);
  timerDisplay.textContent = "00:00";

  startButton.classList.remove("hide");
  breakButton.classList.add("hide");
  finishButton.classList.add("hide");

  localStorage.setItem(
    "btnStatus",
    JSON.stringify({
      startButton: "show",
      breakButton: "hide",
      finishButton: "hide",
    })
  );
}

function updateTimer() {
  if (isRunning) {
    savedTime = Date.now() - startTime;
    localStorage.setItem("savedTime", savedTime);
  }
  var time = new Date(savedTime);
  var minutes = String(time.getUTCMinutes()).padStart(2, "0");
  var seconds = String(time.getUTCSeconds()).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}
