// script.js

// Sélecteurs
const newTaskInput = document.getElementById("newTaskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const label = document.createElement("span");
    label.textContent = task.title;
    if (task.completed) {
      label.style.textDecoration = "line-through";
      label.style.color = "gray";
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Enregistre les tâches dans le localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Ajouter une nouvelle tâche
function addTask() {
  const title = newTaskInput.value.trim();
  if (title) {
    tasks.push({ title, completed: false });
    saveTasks();
    renderTasks();
    newTaskInput.value = "";
    newTaskInput.focus();
  }
}

// Écouteur sur le bouton "Ajouter"
addTaskButton.addEventListener("click", () => {
  addTask();
});

// Permettre d’ajouter une tâche avec la touche "Entrée"
newTaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Au chargement, on dessine les tâches existantes
renderTasks();
