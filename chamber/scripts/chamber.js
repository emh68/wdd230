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

document.addEventListener("DOMContentLoaded", function () {
    // Get the last visit date from localStorage
    const lastVisit = localStorage.getItem("lastVisit");

    // Get the current date in milliseconds
    const currentDate = Date.now();

    // Check if it's the first visit
    if (!lastVisit) {
        localStorage.setItem("lastVisit", currentDate);
        document.getElementById("message").textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate the difference in days
        const timeDifference = currentDate - lastVisit;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        // Display message based on the time difference
        if (daysDifference < 1) {
            document.getElementById("message").textContent = "Back so soon! Awesome!";
        } else {
            const message = (daysDifference === 1) ? "day" : "days";
            document.getElementById("message").textContent = `You last visited ${daysDifference} ${message} ago.`;
        }

        // Update the last visit date in localStorage
        localStorage.setItem("lastVisit", currentDate);
    }
});