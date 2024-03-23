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

        // Display message based on last visit
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

// Interesting facts generator and animation
const factsList = document.querySelector('.facts-list');
let currentFactIndex = 0;

const additionalFacts = [
    "Salt Lake City was founded in 1847 by Mormon pioneers.",
    "The city is named after the Great Salt Lake.",
    "Salt Lake City hosted the Winter Olympics in 2002.",
    "Salt Lake City has a unique grid street system.",
    "Temple Square is a significant religious and cultural center.",
    "The Utah Jazz is the NBA team based in Salt Lake City.",
    "The Great Salt Lake is the largest saltwater lake in the Western Hemisphere.",
    "The city is known for its stunning mountain views and outdoor recreational opportunities.",
    "The Utah State Capitol building in Salt Lake City is an architectural landmark.",
    "The Great Salt Lake is the largest saltwater lake in the Western Hemisphere.",
    "The city has a thriving arts and music scene, with numerous galleries and performance venues.",
    "Salt Lake City is the capital and the most populous city of the state of Utah.",
    "The city is situated between the Wasatch Range to the east and the Oquirrh Mountains to the west.",
    "Salt Lake City is known for its high-quality powder snow, making it a popular destination for winter sports enthusiasts.",
    "The Tabernacle Choir at Temple Square, formerly known as the Mormon Tabernacle Choir, is based in Salt Lake City and is world-renowned for its performances.",
    "The city is home to the University of Utah, a major research university known for its contributions to science and technology.",
    "Salt Lake City is one of the most bicycle-friendly cities in the United States, with an extensive network of bike lanes and trails.",
    "The Bonneville Salt Flats, known for land speed records, are located just west of Salt Lake City.",
    "The city has a diverse culinary scene, with a mix of international cuisines and a focus on locally sourced ingredients.",
    "Salt Lake City is a gateway to numerous national parks, including Zion, Bryce Canyon, and Arches National Parks.",
    "The Sundance Film Festival, one of the largest independent film festivals in the world, takes place annually in Park City, near Salt Lake City."
];

additionalFacts.forEach((fact) => {
    const listItem = document.createElement('li');
    listItem.textContent = fact;
    factsList.appendChild(listItem);
});

// Start the automatic slide transition after the content has loaded
document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateFacts, 4000);
});

function updateFacts() {
    currentFactIndex = (currentFactIndex + 1) % additionalFacts.length;
    factsList.style.transform = `translateX(-${currentFactIndex * 100}%)`;
}