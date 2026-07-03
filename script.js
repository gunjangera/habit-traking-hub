const todayDate = document.getElementById("todayDate");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");
const progressPercent = document.getElementById("progressPercent");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const fullDate = document.getElementById("fullDate");
const weekTitle = document.getElementById("weekTitle");
const daysGrid = document.getElementById("daysGrid");
const prevWeek = document.getElementById("prevWeek");
const nextWeek = document.getElementById("nextWeek");
const habitList = document.getElementById("habitList");
const habitInput = document.getElementById("habitInput");
const addHabit = document.getElementById("addHabit");
const themeToggle = document.getElementById("themeToggle");

let currentDate = new Date();

function formatFullDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function renderWeek(date) {
  const start = getStartOfWeek(date);
  const weekNo = getWeekNumber(date);

  weekTitle.textContent = `Week ${weekNo}`;
  fullDate.textContent = formatFullDate(date);
  todayDate.textContent = formatFullDate(date);

  daysGrid.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + i);

    const dayBox = document.createElement("div");
    dayBox.className = "day-box";

    if (dayDate.toDateString() === new Date().toDateString()) {
      dayBox.classList.add("active");
    }

    dayBox.innerHTML = `
      <span>${dayDate.toLocaleDateString("en-US", { weekday: "short" })}</span>
      <strong>${String(dayDate.getDate()).padStart(2, "0")}</strong>
    `;

    daysGrid.appendChild(dayBox);
  }
}

function updateProgress() {
  const checks = document.querySelectorAll(".habit-check");
  const checked = document.querySelectorAll(".habit-check:checked");

  totalCount.textContent = checks.length;
  completedCount.textContent = checked.length;

  const percent = checks.length === 0 ? 0 : Math.round((checked.length / checks.length) * 100);

  progressPercent.textContent = percent + "%";
  progressText.textContent = percent + "%";
  progressFill.style.width = percent + "%";
}

function createHabitItem(habitText) {
  const item = document.createElement("div");
  item.className = "habit-item";

  item.innerHTML = `
    <label class="habit-left">
      <input type="checkbox" class="habit-check">
      <span class="custom-check"></span>
      <span class="habit-text"></span>
    </label>
    <button class="delete-btn" type="button">✕</button>
  `;

  item.querySelector(".habit-text").textContent = habitText;

  const checkbox = item.querySelector(".habit-check");
  const deleteBtn = item.querySelector(".delete-btn");

  checkbox.addEventListener("change", updateProgress);

  deleteBtn.addEventListener("click", function () {
    item.remove();
    updateProgress();
  });

  return item;
}

document.querySelectorAll(".habit-item").forEach((item) => {
  const checkbox = item.querySelector(".habit-check");
  const deleteBtn = item.querySelector(".delete-btn");

  checkbox.addEventListener("change", updateProgress);

  deleteBtn.addEventListener("click", function () {
    item.remove();
    updateProgress();
  });
});

addHabit.addEventListener("click", function () {
  const text = habitInput.value.trim();

  if (text === "") return;

  const newHabit = createHabitItem(text);
  habitList.appendChild(newHabit);
  habitInput.value = "";
  updateProgress();
});

habitInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addHabit.click();
  }
});

prevWeek.addEventListener("click", function () {
  currentDate.setDate(currentDate.getDate() - 7);
  renderWeek(currentDate);
});

nextWeek.addEventListener("click", function () {
  currentDate.setDate(currentDate.getDate() + 7);
  renderWeek(currentDate);
});

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

renderWeek(currentDate);
updateProgress();