// Hidden date for form page
document.addEventListener("DOMContentLoaded", function () {
    // Get the hidden input element
    let dateTimeInput = document.getElementById('dateTime');

    // set its value to the current date/time in milliseconds
    dateTimeInput.value = Date.now();
})