// === Task Logic ===
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate").value;
  const priority = document.getElementById("taskPriority").value;
  const taskText = taskInput.value.trim();

  if (!taskText) return;

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <span onclick="toggleComplete(this)" class="${priority}-priority">${taskText} - Due: ${taskDate}</span>
    <button class="edit-btn" onclick="editTask(this)">Edit</button>
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
  `;

  document.getElementById("taskList").appendChild(listItem);
  taskInput.value = "";
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function editTask(button) {
  const span = button.parentElement.querySelector("span");
  const [currentText, due] = span.textContent.split(" - Due:");
  const newText = prompt("Edit task:", currentText.trim());
  if (newText) span.textContent = `${newText.trim()} - Due:${due}`;
  saveTasks();
}

function toggleComplete(span) {
  span.classList.toggle("completed");
  saveTasks();
}

// === Filtering ===
function filterTasks(showCompleted) {
  document.querySelectorAll("#taskList li").forEach(task => {
    const span = task.querySelector("span");
    const isCompleted = span.classList.contains("completed");
    task.style.display = showCompleted === isCompleted ? "flex" : "none";
  });
}

// === Storage ===
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(item => {
    const span = item.querySelector("span");
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains("completed"),
      priority: span.classList[0].replace("-priority", "")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  saved.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleComplete(this)" class="${task.priority}-priority ${task.completed ? 'completed' : ''}">${task.text}</span>
      <button class="edit-btn" onclick="editTask(this)">Edit</button>
      <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// === Language Toggle ===
function applyLanguage(lang) {
  const labels = {
    en: {
      placeholder: "Enter a new task...",
      add: "Add Task",
      showUpcoming: "Show Upcoming",
      showCompleted: "Show Completed",
      clear: "Clear All Tasks",
      welcome: "What do you need to accomplish today?"
    },
    fr: {
      placeholder: "Entrer une nouvelle tâche...",
      add: "Ajouter tâche",
      showUpcoming: "À venir",
      showCompleted: "Terminées",
      clear: "Tout effacer",
      welcome: "Qu'avez-vous besoin d'accomplir aujourd'hui?"
    }
  };

  document.body.dataset.lang = lang;
  localStorage.setItem("lang", lang);

  document.getElementById("taskInput").placeholder = labels[lang].placeholder;
  document.getElementById("addTaskBtn").textContent = labels[lang].add;
  document.getElementById("showUpcomingBtn").textContent = labels[lang].showUpcoming;
  document.getElementById("showCompletedBtn").textContent = labels[lang].showCompleted;
  document.querySelector(".clear-btn").textContent = labels[lang].clear;
  document.getElementById("welcomeMessage").textContent = labels[lang].welcome;
  document.getElementById("lang-toggle").textContent = lang === "en" ? "FR 🇫🇷" : "EN 🇺🇸";
}

// === Theme Toggle ===
function applyTheme(theme) {
  document.body.classList.toggle("dark-theme", theme === "dark");
  localStorage.setItem("theme", theme);
  document.getElementById("theme-toggle").textContent =
    theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode";
}

// === Initialization ===
window.addEventListener("DOMContentLoaded", () => {
  // Language
  const savedLang = localStorage.getItem("lang") || "en";
  applyLanguage(savedLang);
  document.getElementById("lang-toggle").addEventListener("click", () => {
    const nextLang = document.body.dataset.lang === "en" ? "fr" : "en";
    applyLanguage(nextLang);
  });

  // Theme
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
    applyTheme(nextTheme);
  });

  // Tasks
  loadTasks();
  document.getElementById("addTaskBtn").addEventListener("click", addTask);
  document.getElementById("showUpcomingBtn").addEventListener("click", () => filterTasks(false));
  document.getElementById("showCompletedBtn").addEventListener("click", () => filterTasks(true));
  document.querySelector(".clear-btn").addEventListener("click", () => {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
  });
});
