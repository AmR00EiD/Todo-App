// User Name
const username = document.getElementById("username");

// user name from login
uName = localStorage.getItem("username");
username.textContent = uName;

// Handle Tasks
const tasks = document.getElementById("tasks");

// Load tasks from local storage when the page loads
window.addEventListener("load", loadTasks);

// Adding a task
document.getElementById("taskAdding").addEventListener("click", (ev) => {
  ev.preventDefault();
  const task = document.getElementById("taskField").value;

  if (task.length == 0) {
    alert("Please enter a task");
    return 0;
  }

  if (tasks.children[0]?.id == "emptyList") {
    tasks.innerHTML = ``;
  }

  const creationDate = new Date().toLocaleDateString(); // Capture the current date and time
  const taskObject = { text: task, completed: false, date: creationDate };
  addTaskToDOM(taskObject, true);
  saveTaskToLocalStorage(taskObject);

  document.getElementById("taskField").value = ``;
});

// Load tasks from local storage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (savedTasks.length === 0) {
    tasks.innerHTML = `<p class="task-text" id="emptyList">No Tasks</p>`;
  } else {
    savedTasks.forEach((taskObject) => addTaskToDOM(taskObject, false));
  }
}

// Add task to DOM
function addTaskToDOM(taskObject, prepend = false) {
  const taskHtml = `
        <div class="task-card">
            <p id="taskText" class="task-text ${
              taskObject.completed ? "task-text-done" : ""
            }">
                ${taskObject.text}
                <span id="task-date">${taskObject.date}</span>
            </p>
            <div class="btns">
                <button onclick="${
                  taskObject.completed
                    ? "resumeWork(this);"
                    : "completeTask(this);"
                }" id="taskBtn" class="${
    taskObject.completed ? "main-btn" : "secondary-btn"
  }">
                    ${taskObject.completed ? "Resume Work" : "Complete Task"}
                </button>
                <button onclick="deleteTask(this);" class="remove-btn">Delete Task</button>
            </div>
        </div>
    `;
  if (prepend) {
    tasks.innerHTML = taskHtml + tasks.innerHTML;
  } else {
    tasks.innerHTML += taskHtml;
  }
}

// Save task to local storage
function saveTaskToLocalStorage(taskObject) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.unshift(taskObject); // Add new task at the beginning of the array
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// Update task in local storage
function updateTaskInLocalStorage(taskText, completed) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = savedTasks.findIndex((task) => task.text === taskText);
  if (taskIndex !== -1) {
    savedTasks[taskIndex].completed = completed;
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = savedTasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Mark task as complete
function completeTask(e) {
  const taskCard = e.parentElement.parentElement;
  const taskText = taskCard
    .querySelector("#taskText")
    .childNodes[0].textContent.trim();

  const mainBtn = taskCard.querySelector("#taskBtn");
  taskCard.querySelector("#taskText").classList = ["task-text-done"];
  mainBtn.classList = ["main-btn"];
  mainBtn.innerHTML = "Resume Work";
  mainBtn.setAttribute("onclick", "resumeWork(this);");
  // dateTask = document.getElementById("task-date") ;
  // dateTask.style.display = "none";
  updateTaskInLocalStorage(taskText, true);
}

// Resume work on a task
function resumeWork(e) {
  const taskCard = e.parentElement.parentElement;
  const taskText = taskCard
    .querySelector("#taskText")
    .childNodes[0].textContent.trim();
  const mainBtn = taskCard.querySelector("#taskBtn");

  taskCard.querySelector("#taskText").classList = ["task-text"];
  mainBtn.classList = ["secondary-btn"];
  mainBtn.innerHTML = "Complete Task";
  mainBtn.setAttribute("onclick", "completeTask(this);");
  // dateTask = document.getElementById("task-date");
  // dateTask.style.display = "";

  updateTaskInLocalStorage(taskText, false);
}

// Delete a task
function deleteTask(e) {
  const taskCard = e.parentElement.parentElement;
  const taskText = taskCard
    .querySelector("#taskText")
    .childNodes[0].textContent.trim();
  taskCard.remove();

  removeTaskFromLocalStorage(taskText);

  // If there are no more tasks, show "No Tasks" message
  if (tasks.children.length === 0) {
    tasks.innerHTML = `<p class="task-text" id="emptyList">No Tasks</p>`;
  }
}
