window.onload = function() {
    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");
    let taskPriority = document.getElementById("taskPriority");
    let taskList = document.getElementById("taskList");
    let addTaskBtn = document.getElementById("addTaskBtn"); // Explicitly target "Add Task"
    let clearTaskBtn = document.querySelector(".clear-btn");

    // Ensure event listeners are properly assigned
    addTaskBtn.addEventListener("click", addTask);
    clearTaskBtn.addEventListener("click", clearTasks);

    function addTask() {
        let taskValue = taskInput.value.trim();
        let taskDeadline = taskDate.value;
        let priority = taskPriority.value;

        if (taskValue !== "") {
            let listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${taskValue}</strong> - Due: ${taskDeadline} - Priority: ${priority}`;

            listItem.onclick = () => {
                listItem.classList.toggle("completed");
                playCompletionSound();
            };

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌ Remove";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => listItem.remove();

            listItem.appendChild(deleteBtn);
            taskList.appendChild(listItem);

            taskInput.value = "";
            taskDate.value = "";
            taskPriority.selectedIndex = 0;
        } else {
            alert("Please enter a task before adding!");
        }
    }

    function clearTasks() {
        if (taskList.children.length > 0) {
            taskList.innerHTML = "";
        } else {
            alert("No tasks to clear!");
        }
    }

    function playCompletionSound() {
        try {
            let audio = new Audio('completion-sound.mp3');
            audio.play();
        } catch (error) {
            console.error("Audio playback error:", error);
        }
    }
};
