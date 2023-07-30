const tasks = [];
const taskForm = document.querySelector("[data-task-form]");
const taskInput = document.querySelector("[data-task-input]");
const taskContainer = document.querySelector("[data-task-container]");
const taskTemplate = document.getElementById("task-template");
const taskCounter = document.querySelector("[data-list-count]");

// Add New Task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = taskInput.value;
  if (taskName == null || taskName === "") return;
  console.log(taskName);
  const task = createTask(taskName);
  tasks.push(task);
  taskInput.value = null;
  console.log(tasks);
  displayTask();
});
// Create Task
function createTask(taskName) {
  return { id: Date.now().toString(), name: taskName, complete: false };
}

// Render
function renderTask() {
  displayTask();
  taskCount(tasks);
  cleanElement(tasks);
}

// Display Task
function displayTask() {
  cleanElement(taskContainer);
  tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    const label = taskElement.querySelector("label");

    checkbox.id = task.id;
    checkbox.checked = task.complete;

    label.htmlFor = task.id;
    label.append(task.name);
    taskContainer.appendChild(taskElement);

    taskCount(tasks);
  });
}
// Clean the Element when refresh
function cleanElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
// Task Counter
function taskCount(taskcount) {
  const incompleteTask = tasks.filter((task) => !task.complete).length;
  const taskString = incompleteTask <= 1 ? "task" : "tasks";
  taskCounter.innerText = `${incompleteTask} ${taskString} left`;
}

// Task Checkbox Checker
taskContainer.addEventListener("click", (e) => {
  console.log(e.target.checked);
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedTask = tasks.find((task) => task.id === e.target.id);
    selectedTask.complete = e.target.checked;
  }
  taskCount(tasks);
});

renderTask();
