document.addEventListener("DOMContentLoaded", function() {
    console.log("Page fully loaded!");
    const addListButton = document.getElementById("addListButton");
    const listContainer = document.getElementById("listContainer");
    const listMakeModal = document.getElementById("listMakeModal");
    const closeListMakeButton = document.getElementById("closeListMakeButton");
    const submitListNameButton = document.getElementById("submitListNameButton");
    const listNameInput = document.getElementById("listNameInput");

    const taskContainer = document.getElementById("taskContainer");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskMakeModal = document.getElementById("taskMakeModal");
    const closeTaskMakeButton = document.getElementById("closeTaskMakeButton");
    const submitTaskNameButton = document.getElementById("submitTaskNameButton");
    const taskNameInput = document.getElementById("taskNameInput");
    const clearTaskButton = document.getElementById("clearTaskButton");

    let taskLists = []; // Stores all lists and their tasks
    let activeList = null; // The currently selected list    

    

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("deleteListButton")) {
            deleteList(event);
        }
        else if (event.target.classList.contains("listItem") || event.target.classList.contains("listItemName")) {
            let listElement;
            if(event.target.classList.contains("listItem")) {
                listElement = event.target;
            } else {
                listElement = event.target.parentElement;
            }
            let index = listElement.dataset.index;
            activeList = taskLists[index];
            renderTasks();
        }
        else if (event.target.id === "addTaskButton") {
            taskMakeModal.classList.remove("hidden");
        }
        else if (event.target.classList.contains("taskCheckBox")) {
            checkTask(event.target);
        }
    });

    addListButton.addEventListener("click", function() {
        listMakeModal.classList.remove("hidden");
    });

    closeListMakeButton.addEventListener("click", function () {
        listMakeModal.classList.add("hidden");
    });

    submitListNameButton.addEventListener("click", function () {
        const name = listNameInput.value.trim();
        if (name) {
            listNameInput.value = "";
            listMakeModal.classList.add("hidden");
            addList(name);
        } else {
            alert("Please enter a name!");
        }
    });

    submitTaskNameButton.addEventListener("click", function () {
        const name = taskNameInput.value.trim();
        if (name) {
            taskNameInput.value = "";
            taskMakeModal.classList.add("hidden");
            addTask(name);
        } else {
            alert("Please enter a name!");
        }
    });

    addTaskButton.addEventListener("click", function() {
        taskMakeModal.classList.remove("hidden");
    });

    closeTaskMakeButton.addEventListener("click", function () {
        taskMakeModal.classList.add("hidden");
    });

    clearTaskButton.addEventListener("click", function() {
        clearCheckedTasks();
    });
    
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("deleteTaskButton")) {
            deleteTask(event.target);
        }
    });



    /*---------------------------
    List Functions
    ----------------------------*/

    function renderLists() {
        listContainer.innerHTML = "";
        taskLists.forEach((list, index) => {
            let listElement = `<div data-index="${index}" data-id="${list.id}" class="listItem flex px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded items-center justify-between">
                        <span class="listItemName w-24 block break-words whitespace-normal">${list.name}</span>
                        <button class="deleteListButton bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2">Delete List</button>
                    </div>`;
            listContainer.insertAdjacentHTML("beforeend", listElement);
        });
    }

    function addList(name) {
        let newList = {
            name: name,
            id: crypto.randomUUID(),
            tasks: [],
        };
        taskLists.push(newList);
        activeList = newList;
        renderLists();
    }

    function deleteList(event) {
        let listElement = event.target.parentElement;
        let index = listElement.dataset.index;
        let id = listElement.dataset.id;
        listElement.remove();
        taskLists.splice(index, 1);
        if(id === activeList.id) {
            activeList = taskLists[index - 1]
        }
        renderLists();
    }

    function setActiveList() {

    }

    /*---------------------------
    Task Functions
    ----------------------------*/

    function renderTasks() {
        taskContainer.innerHTML = "";
        activeList.tasks.forEach((task, index) => {
            let isChecked = "";
            if(task.checked) {
                isChecked = "checked";
            }
            let taskElement = `<!-- Task -->
                    <div data-index="${index}" class="task flex items-center justify-between bg-gray-200 hover:bg-gray-300 p-3 rounded ml-[70px]">
                        <div class="flex items-center">
                            <input type="checkbox" ${isChecked} class="taskCheckBox w-5 h-5 mr-3">
                            <span class="taskName text-lg">${task.name}</span>
                        </div>
                        <div class="flex space-x-2 ml-2">
                            <button class="editTaskButton bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                            <button class="deleteTaskButton bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                        </div>
                    </div>`;
            taskContainer.insertAdjacentHTML("beforeend", taskElement);
        });
    }

    function addTask(name) {
        let newTask = {
            name: name,
            checked: false
        };
        activeList.tasks.push(newTask);
        renderTasks();
    }

    function deleteTask(element) {
        let taskElement = element.closest(".task");
        let index = taskElement.dataset.index;
        taskElement.remove();
        activeList.tasks.splice(index, 1);
        renderTasks();
    }

    function checkTask(element) {
        let taskElement = element.closest(".task");
        let index = taskElement.dataset.index;
        activeList.tasks[index].checked = element.checked;
    }

    function clearCheckedTasks() {
        let checkedTasks = taskContainer.querySelectorAll('input[type="checkbox"]:checked');
        checkedTasks.forEach(function(checkbox) {
            deleteTask(checkbox);
        });
    }

    function editTask() {

    }

    editTaskButton.addEventListener("click", function() {

    });

});