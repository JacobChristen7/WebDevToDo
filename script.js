document.addEventListener("DOMContentLoaded", function() {
    console.log("Page fully loaded!");
    const addListButton = document.getElementById("addListButton");
    const listContainer = document.getElementById("listContainer");
    const listMakeModal = document.getElementById("listMakeModal");
    const closeListMakeButton = document.getElementById("closeListMakeButton");
    const submitListNameButton = document.getElementById("submitListNameButton");
    const listNameInput = document.getElementById("listNameInput");
    const listTitle = document.querySelector("#listContent h2");

    const taskContainer = document.getElementById("taskContainer");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskMakeModal = document.getElementById("taskMakeModal");
    const closeTaskMakeButton = document.getElementById("closeTaskMakeButton");
    const submitTaskNameButton = document.getElementById("submitTaskNameButton");
    const taskNameInput = document.getElementById("taskNameInput");
    const clearTaskButton = document.getElementById("clearTaskButton");

    let taskLists = []; // Stores all lists and their tasks
    let activeList = null; // The currently selected list
    let editingTaskIndex = null; // Track the task being edited

    /*---------------------------
    Dynamically Added Element Functions
    ----------------------------*/
    
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
        else if (event.target.classList.contains("taskCheckBox")) {
            checkTask(event.target);
        }
        else if (event.target.classList.contains("deleteTaskButton")) {
            deleteTask(event.target);
        }
        else if (event.target.classList.contains("editTaskButton")) {
            let taskElement = event.target.closest(".task");
                editingTaskIndex = taskElement.dataset.index;
                taskNameInput.value = activeList.tasks[editingTaskIndex].name;
                taskMakeModal.querySelector("h2").textContent = "Edit Your Task Name";
                taskMakeModal.classList.remove("hidden");
        }
    });

    /*---------------------------
    List Functions
    ----------------------------*/

    function renderLists() {
        listContainer.innerHTML = "";
        updateListTitle();
        taskLists.forEach((list, index) => {
            let listElement = `<div data-index="${index}" data-id="${list.id}" class="listItem flex px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded items-center justify-between">
                        <span class="listItemName w-24 block break-words whitespace-normal">${list.name}</span>
                        <button class="deleteListButton bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2">Delete List</button>
                    </div>`;
            listContainer.insertAdjacentHTML("beforeend", listElement);
        });
        renderTasks();
    }

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
            let newIndex = index - 1;
            if(newIndex < 0) {
                newIndex = 0; // Checks if deleted list is the first in the array
            }
            if(taskLists[newIndex]) {
                activeList = taskLists[newIndex]
            } else {
                activeList = undefined;
            }
        }
        renderLists();
    }

    function updateListTitle() {
        listTitle.textContent = activeList ? activeList.name : "List Name"; // Default if no list
    }

    /*---------------------------
    Task Functions
    ----------------------------*/

    function renderTasks() {
        taskContainer.innerHTML = "";
        updateListTitle();
        if(activeList && activeList.tasks) {        
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
        saveData();
    }

    addTaskButton.addEventListener("click", function() {
        taskMakeModal.classList.remove("hidden");
    });

    closeTaskMakeButton.addEventListener("click", function () {
        taskMakeModal.classList.add("hidden");
    });

    clearTaskButton.addEventListener("click", function() {
        clearCheckedTasks();
    });

    submitTaskNameButton.addEventListener("click", function () {
        const name = taskNameInput.value.trim();
        if (!name) {
            alert("Please enter a name!");
            return;
        }
    
        if (editingTaskIndex !== null) {
            activeList.tasks[editingTaskIndex].name = name;
            editingTaskIndex = null;
        } else {
            activeList.tasks.push({ name: name, checked: false });
        }
    
        taskNameInput.value = "";
        taskMakeModal.classList.add("hidden");
        taskMakeModal.querySelector("h2").textContent = "Enter Your Task Name";
        renderTasks();
    });

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
        activeList.tasks = activeList.tasks.filter(task => !task.checked);
        renderTasks();
    }

    /*---------------------------
    Data Functions
    ----------------------------*/

    function saveData() {
        localStorage.setItem("lists", JSON.stringify(taskLists));
        localStorage.setItem("activeListID", JSON.stringify(activeList.id));
        alert("data saved!")
    }

    function loadData() {
        taskLists = JSON.parse(localStorage.getItem("lists"));
        activeListID = JSON.parse(localStorage.getItem("activeListID"));
        activeList = taskLists.find(list => list.id === activeListID);
        renderLists();
    }

    loadData(); // Loads the user data from local storage
});