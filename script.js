function saveName() {
  const nameInput = document.getElementById('name');
  const userName = nameInput.value;
  if (userName.trim() !== '') {
    localStorage.setItem('userName', userName);
  }
}
function loadName() {
  const nameInput = document.getElementById('name');
  const userName = localStorage.getItem('userName');
  if (userName) {
    nameInput.value = userName;
  }
}
loadName();

document.getElementById('saveName').addEventListener('click', saveName);

function openCategoryModal(categoryId) {
  const modal = document.getElementById(`modal-${categoryId}`);
  modal.style.display = "block";
}

function closeCategoryModal(categoryId) {
  const modal = document.getElementById(`modal-${categoryId}`);
  modal.style.display = "none";
}

document.getElementById("studies").addEventListener("click", function () {
  openCategoryModal("studies");
});

document.getElementById("work").addEventListener("click", function () {
  openCategoryModal("work");
});

document.getElementById("household-chores").addEventListener("click", function () {
  openCategoryModal("household-chores");
});

document.getElementById("groceries").addEventListener("click", function () {
  openCategoryModal("groceries");
});

document.getElementById("personal").addEventListener("click", function () {
  openCategoryModal("personal");
});

document.getElementById("close-studies").addEventListener("click", function () {
  closeCategoryModal("studies");
});

document.getElementById("close-work").addEventListener("click", function () {
  closeCategoryModal("work");
});

document.getElementById("close-household-chores").addEventListener("click", function () {
  closeCategoryModal("household-chores");
});

document.getElementById("close-groceries").addEventListener("click", function () {
  closeCategoryModal("groceries");
});

document.getElementById("close-personal").addEventListener("click", function () {
  closeCategoryModal("personal");
});


window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
      const openModal = document.querySelector(".modal[style='display: block;']");
      if (openModal) {
          openModal.style.display = "none";
      }
  }
});
function addTask(inputId, dateInputId) {
  const taskInput = document.getElementById(inputId);
  const dateInput = document.getElementById(dateInputId);
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskText !== '') {
      const sectionId = inputId.replace('Task', 'Tasks');
      const taskList = document.getElementById(sectionId);
      const listItem = document.createElement('li');
      
      const taskTextWithDate = `${taskText} (Due: ${taskDate})`;

      listItem.innerHTML = taskTextWithDate +
          '<button onclick="editTask(this)">Edit</button>' +
          '<button onclick="deleteTask(this)">Delete</button>';
      taskList.appendChild(listItem);
      taskInput.value = '';
      dateInput.value = '';
      saveTasksToLocalStorage(sectionId, taskList.innerHTML);
  }
}
function saveTasksToLocalStorage(sectionId, taskListHTML) {
  localStorage.setItem(sectionId, taskListHTML);
}

// Function to edit a task
function editTask(button) {
  const listItem = button.parentElement;
  const editedTaskText = prompt("Edit the task:", listItem.textContent.split(" (Due:")[0]);
  if (editedTaskText !== null) {
      listItem.innerHTML = editedTaskText +
          '<button onclick="editTask(this)">Edit</button>' +
          '<button onclick="deleteTask(this)">Delete</button>';
  }
}

// Function to delete a task
function deleteTask(button) {
  const listItem = button.parentElement;
  listItem.remove();
  const sectionId = listItem.parentElement.id;
  updateTasksInLocalStorage(sectionId);
}

function updateTasksInLocalStorage(sectionId) {
  const taskList = document.getElementById(sectionId);
  const tasks = Array.from(taskList.querySelectorAll('li'));

  // Create an array to store the task text for each task
  const taskTexts = tasks.map((task) => task.textContent.split(" (Due:")[0]);

  // Update the local storage for the section with the updated tasks
  localStorage.setItem(sectionId, JSON.stringify(taskTexts));
}


window.addEventListener('load', function () {
  loadTasksFromLocalStorage('studiesTasks');
  loadTasksFromLocalStorage('workTasks');
  loadTasksFromLocalStorage('household-choresTasks');
  loadTasksFromLocalStorage('groceriesTasks');
  loadTasksFromLocalStorage('personalTasks');
});

function loadTasksFromLocalStorage(sectionId) {
  const taskList = document.getElementById(sectionId);
  const savedTasks = localStorage.getItem(sectionId);

  if (savedTasks) {
    taskList.innerHTML = savedTasks;
  }
}
