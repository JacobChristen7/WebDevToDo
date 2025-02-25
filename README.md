# WebDevToDo

# Tailwind Commands

npx @tailwindcss/cli -i input.css -o output.css --watch
use to see changes to css with tailwind.


make sure there is a tailwind.config.js file with the below text inside it.
module.exports = {
  content: ["./index.html"], // Adjust based on your file locations
  theme: {
    extend: {},
  },
  plugins: [],
};