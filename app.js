const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementById('new-task-button');
const incompleteList = document.getElementById('incomplete-tasks');
const completedList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const taskListItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskText;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  taskListItem.appendChild(checkBox);
  taskListItem.appendChild(label);
  taskListItem.appendChild(editInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);
  return taskListItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskListItem = createNewTaskElement(newTaskInput.value);

  incompleteList.appendChild(taskListItem);
  bindTaskEvents(taskListItem);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskListItem = this.parentNode;

  const editInput = taskListItem.querySelector('input[type=text]');
  const label = taskListItem.querySelector('label');
  const editButton = taskListItem.querySelector('.edit');

  const isEditMode = taskListItem.classList.contains('edit-mode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskListItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const taskListItem = this.parentNode;
  taskListItem.remove();
};

const moveTaskToOtherList = function () {
  const taskListItem = this.parentNode;
  const isCompleted = completedList.contains(taskListItem);

  if (isCompleted) {
    incompleteList.appendChild(taskListItem);
  } else {
    completedList.appendChild(taskListItem);
  }
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;

  checkBox.onchange = moveTaskToOtherList;
};

const bindTaskListEvents = function (taskList) {
  for (const taskListItem of taskList.children) {
    bindTaskEvents(taskListItem);
  }
};

bindTaskListEvents(incompleteList);
bindTaskListEvents(completedList);
