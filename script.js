const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categorySelect = document.getElementById("category-select");
let currentCategory = "all";

// Function to add a task
function addTask() {
  if (inputBox.value === "") {
    alert("Please write a task name");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.dataset.category = categorySelect.value;

    // Add delete button
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00D7"; // Unicode for '×'
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);

    // Add edit button
    let editBtn = document.createElement("span");
    editBtn.innerHTML = "✎"; // Unicode for '✎'
    editBtn.classList.add("edit-btn");
    li.appendChild(editBtn);

    listContainer.appendChild(li);
    inputBox.value = ""; // Clear the input box
    saveData(); // Save data to local storage
  }
}

// Event listener for list container
listContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.classList.contains("edit-btn")) {
    const editInput = prompt("Edit your task:", e.target.parentElement.firstChild.textContent);
    if (editInput) {
      e.target.parentElement.firstChild.textContent = editInput;
      saveData();
    }
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
});

// Function to select category
function selectCategory(category) {
  currentCategory = category;
  const allButtons = document.querySelectorAll(".categories button");
  allButtons.forEach(button => button.classList.remove("active"));
  document.querySelector(`.categories button[onclick="selectCategory('${category}')"]`).classList.add("active");

  const allTasks = listContainer.querySelectorAll("li");
  allTasks.forEach(task => {
    task.style.display = category === "all" || task.dataset.category === category ? "block" : "none";
  });
}

// Function to save data to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show tasks from local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
  selectCategory(currentCategory);
}

// Initial call to show tasks and set category view
showTask();
