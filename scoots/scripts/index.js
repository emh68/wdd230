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
