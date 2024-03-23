// Hidden date for form page
document.addEventListener("DOMContentLoaded", function () {
    // Get the hidden input element
    let dateTimeInput = document.getElementById('dateTime');

    // Set its value to current date/time in milliseconds
    dateTimeInput.value = Date.now();
})