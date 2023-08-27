const DAILY_GOALS = [
  "Wake up",
  "Eat breakfast",
  "Work on project",
  "Time for cats",
  "Time for girlfriend",
  "Time for friends",
  "Eat dinner",
];

const todosList = document.querySelector(".todos");
const date = new Date();
const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

const getSavedData = () => {
  let storage = localStorage.getItem("daily-todos");
  if (!storage) {
    localStorage.setItem("daily-todos", JSON.stringify({}));
    storage = localStorage.getItem("daily-todos");
  }
  return JSON.parse(storage);
};

const isItemChecked = (item) => {
  let savedData = getSavedData();
  return savedData[day] && savedData[day][item];
};

const createTodo = (todo) => {
  const savedData = getSavedData();
  const listItem = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isItemChecked(todo);
  checkbox.addEventListener("change", () => {
    const checked = checkbox.checked;
    setItemChecked(todo, checked);
  });
  label.appendChild(checkbox);
  const text = document.createTextNode(todo);
  label.appendChild(text);
  listItem.appendChild(label);
  return listItem;
};

const render = () => {
  todosList.innerHTML = "";
  DAILY_GOALS.forEach((todo) => {
    todosList.appendChild(createTodo(todo));
  });
};

const setItemChecked = (item, checked) => {
  let savedData = getSavedData();
  if (!savedData[day]) {
    savedData[day] = {};
  }
  savedData[day][item] = checked;
  localStorage.setItem("daily-todos", JSON.stringify(savedData));
  render();
};

render();
