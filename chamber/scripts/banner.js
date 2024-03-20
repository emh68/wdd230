// Homepage banner
document.addEventListener("DOMContentLoaded", function () {
    // Get the current day of the week (0 = Sun, 1 = Mon, etc.)
    const currentDayOfWeek = new Date().getDay();
    const banner = document.querySelector(".banner");

    // Check if it is Monday, Tuesday or Wednesday
    if (currentDayOfWeek >= 1 && currentDayOfWeek <= 3) {
        banner.style.display = "block"; // Show the banner
    } else {
        banner.style.display = "none"; // Hide the banner
    }

    // Close banner when closeButton clicked
    const closeButton = document.querySelector(".banner-close");
    closeButton.addEventListener("click", function () {
        banner.style.display = "none"; // Hide the banner when the close button is clicked
    });
});
