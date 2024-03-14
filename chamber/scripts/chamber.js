// Dynamically populate the current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Dynamically populate the last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburger navigation button
// Store the selected elements that we are going to use. 
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});


const modeButton = document.querySelector('#modeToggle');
const body = document.querySelector('body');
const main = document.querySelector('main');

modeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode', modeButton.checked);
    main.classList.toggle('dark-mode', modeButton.checked);
});