const dateEl = document.getElementById("date");
const welcomeHeading = document.querySelector(".welcome h2");
const progressText = document.querySelector("#progress p");
const taskItems = document.querySelectorAll("#tasks ul li");

const timerSection = document.getElementById("timer");
const timerDisplay = timerSection.querySelector("p");
const buttons = timerSection.querySelectorAll("button");

const startBtn = buttons[0];
const pauseBtn = buttons[1];
const resetBtn = buttons[2];

let totalSeconds = 25 * 60;
let timer = null;
let isRunning = false;

/* Date */
function updateDate() {
    const today = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    dateEl.textContent = today.toLocaleDateString("en-US", options);
}

/* Greeting */
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = "Good Morning";

    if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17) {
        greeting = "Good Evening";
    }

    welcomeHeading.textContent = `${greeting}, Gunjan 👋`;
}

/* Progress */
function updateProgress() {
    const completedTasks = document.querySelectorAll("#tasks ul li.completed").length;
    const totalTasks = taskItems.length;
    const percent = Math.round((completedTasks / totalTasks) * 100);

    progressText.textContent = `${percent}% Completed`;
}

/* Task toggle */
taskItems.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("completed");
        updateProgress();
    });
});

/* Timer format */
function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins} : ${secs}`;
}

/* Timer display update */
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(totalSeconds);
}

/* Start timer */
function startTimer() {
    if (isRunning) return;

    isRunning = true;
    timer = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            alert("Pomodoro session completed!");
        }
    }, 1000);
}

/* Pause timer */
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

/* Reset timer */
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    totalSeconds = 25 * 60;
    updateTimerDisplay();
}

/* Button events */
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

/* Initial load */
updateDate();
updateGreeting();
updateProgress();
updateTimerDisplay();