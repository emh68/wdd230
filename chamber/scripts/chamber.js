// Dynamically populate the current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Dynamically populate the last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburger navigation button
// Store the selected elements 
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

// Add click event listener to hamburger button and use callback function to toggle list element's list of classes.
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

// Toggle dark mode
const modeButton = document.querySelector('#modeToggle');
const body = document.querySelector('body');
const main = document.querySelector('main');

modeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode', modeButton.checked);
    main.classList.toggle('dark-mode', modeButton.checked);
});

