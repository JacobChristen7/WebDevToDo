document.addEventListener("DOMContentLoaded", function() {
    console.log("Page fully loaded!");
    const addListButton = document.getElementById("addListButton");
    const listContainer = document.getElementById("listContainer");
    const listMakeModal = document.getElementById("listMakeModal");
    const closeListMakeButton = document.getElementById("closeListMakeButton");
    const submitListNameButton = document.getElementById("submitListNameButton");
    const listNameInput = document.getElementById("listNameInput");
    const deleteListButton = document.getElementById("deleteListButton");

    const taskContainer = document.getElementById("taskContainer");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskMakeModal = document.getElementById("taskMakeModal");
    const closeTaskMakeButton = document.getElementById("closeTaskMakeButton");
    const submitTaskNameButton = document.getElementById("submitTaskNameButton");
    const taskNameInput = document.getElementById("taskNameInput");
    const deleteTaskButton = document.getElementById("deleteTaskButton");
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

function addList(name) {
    let list = `<div class="flex px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded items-center justify-between">
                    <span class="w-24 block break-words whitespace-normal">${name}</span>
                    <button class="deleteListButton bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2">Delete List</button>
                </div>`;
    listContainer.insertAdjacentHTML("beforeend", list);
}

function deleteList(event) {
    event.target.parentElement.remove();
}

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteListButton")) {
        deleteList(event);
    }
});

addTaskButton.addEventListener("click", function() {
    taskMakeModal.classList.remove("hidden");
});

closeTaskMakeButton.addEventListener("click", function () {
    taskMakeModal.classList.add("hidden");
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

function addTask(name) {
    let task = `<!-- Task -->
                <div class="task flex items-center justify-between bg-gray-200 hover:bg-gray-300 p-3 rounded ml-[70px]">
                    <div class="flex items-center">
                        <input type="checkbox" class="w-5 h-5 mr-3">
                        <span class="text-lg">${name}</span>
                    </div>
                    <div class="flex space-x-2 ml-2">
                        <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                        <button class="deleteTaskButton bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    </div>
                </div>`;
    taskContainer.insertAdjacentHTML("beforeend", task);
}

function deleteTask(event) {
    event.target.closest(".task").remove();
}

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteTaskButton")) {
        deleteTask(event);
    }
});