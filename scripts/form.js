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
let emailInput = document.getElementById('email');
const passwordMessage = document.querySelector(".password-message");
const emailMessage = document.querySelector(".email-message");
const form = document.querySelector('form');

confirmPassword.addEventListener('focusout', function () {
    if (password.value != confirmPassword.value) {
        passwordMessage.textContent = "Your passwords do not match";
    } else {
        passwordMessage.textContent = "";
    }
});

emailInput.addEventListener('focusout', function () {
    let emailValue = this.value;
    if (!isEmailValid(emailValue)) {
        emailMessage.textContent = "Please enter a valid byui.edu email address.";
    } else {
        emailMessage.textContent = "";
    }
});

form.addEventListener('submit', function (event) {
    if (!isEmailValid || !isPasswordValid(emailValue, PasswordValue)) {
        event.preventDefault();
    }
});

function isEmailValid(email) {
    return /@byui\.edu$/.test(email);
}
