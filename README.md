# WebDevToDo

Project Startup
Cloneing the Project
use "git clone https://github.com/JacobChristen7/WebDevToDo.git" in the terminal to get the project locally


Tailwind Commands and Startup

npx @tailwindcss/cli -i input.css -o output.css --watch
use in the terminal to see changes to css with tailwind.

make sure there is a tailwind.config.js file with the below text inside it.
module.exports = {
  content: ["./index.html"], // Adjust based on your file locations
  theme: {
    extend: {},
  },
  plugins: [],
};

Project Features

Multiple Lists: Create, delete, and switch between multiple lists.

Task Management: Add, edit, delete, and mark tasks as completed.

Drag and Drop: Reorder lists and tasks using drag-and-drop functionality.

Local Storage: Saves lists and tasks automatically.

Task Filtering: Remove completed tasks with a single click.

Smooth Animations: Visual effects for removing lists and tasks.