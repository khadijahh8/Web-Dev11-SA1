function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");

    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    // Create task wrapper
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
    });

    // Create label
    const label = document.createElement("label");
    label.innerText = taskInput.value;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        taskList.removeChild(li);
    });

    // Append checkbox and label to taskDiv
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);

    // Append taskDiv and delete button to list item
    li.appendChild(taskDiv);
    li.appendChild(deleteBtn);

    // Add the new list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
}
