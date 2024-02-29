const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("rating");

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.innerHTML = range.value;
}

let password = document.getElementById('pwd');
let confirmPassword = document.getElementById('confirmPwd');
const messageDiv = document.querySelector(".message");

confirmPassword.addEventListener('focusout', function () {
    if (password.value != confirmPassword.value) {
        messageDiv.textContent = "Your passwords do not match";
        confirmPassword.value = "";
        confirmPassword.focus();

    } else {
        messageDiv.textContent = "";

    }
});