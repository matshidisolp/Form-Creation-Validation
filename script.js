// Ensure DOM is loaded before script runs
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false to avoid re-saving
        });
    }

    // Add a new task
    function addTask(taskText, save = true) {
        // Read from input if taskText not provided (user-initiated)
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Alert if task is empty (for user input)
        if (taskText === "") {
            if (save) {
                alert("Please enter a task.");
            }
            return;
        }

        // Create list item and set text
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Set remove button click action
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove from DOM

            // Update Local Storage
            let currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            currentTasks = currentTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(currentTasks));
        };

        // Append button to list item, then list item to task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to Local Storage if new task
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            taskInput.value = ""; // Clear input field
        }
    }

    // Add task on button click
    addButton.addEventListener('click', () => addTask());

    // Add task on 'Enter' key press in input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when page loads
    loadTasks();
    // Invoke addTask on DOMContentLoaded (as per previous specific checker requirement)
    // This might cause an initial alert if taskInput is empty.
    addTask();
});
