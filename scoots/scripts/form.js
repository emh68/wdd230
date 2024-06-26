const rentalsData = "https://emh68.github.io/wdd230/scoots/data/rentals.json";

async function fetchData() {
    try {
        const response = await fetch(rentalsData);
        const data = await response.json();
        console.log("Fetched rental data:", data);
        return data.rentals;
    } catch (error) {
        console.error('Error fetching rental data:', error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    // Add one rental by default with inputs disabled
    addRental(true);

    // Event listener for the "Add Rental" button
    const addRentalButton = document.getElementById("addRentalButton");
    addRentalButton.addEventListener("click", addRental);

    // Check dates before selecting rental period or vehicle type
    const pickupDateInput = document.getElementById("pickupdate");
    const returnDateInput = document.getElementById("returndate");
    pickupDateInput.addEventListener("change", function () {
        updateTotalCost(); // Update total cost when pickup date changes
        checkDatesBeforeSelection();
    });
    returnDateInput.addEventListener("change", function () {
        updateTotalCost(); // Update total cost when return date changes
        checkDatesBeforeSelection();
    });

    // Event listener to handle changes in vehicle selection
    const rentalInputs = document.getElementById("rentalInputs");
    rentalInputs.addEventListener("change", function (event) {
        const target = event.target;
        if (target.tagName === "SELECT") {
            updateTotalCost();
        }
    });
});

async function addRental(isDefault = false) {
    // Check if both dates are selected
    const pickupDate = document.getElementById("pickupdate").value;
    const returnDate = document.getElementById("returndate").value;
    let div;
    if (pickupDate && returnDate) {
        div = await addNewRental(); // Add a new rental and enable inputs
    } else {
        div = await addNewRental(true); // Add a new rental with inputs disabled
    }

    // If it's not the default rental, enable inputs accordingly
    if (!isDefault && div) {
        enableRentalInputsForSingle(div);
    }
}

async function addNewRental(disableInputs = false) {
    const rentalInputs = document.getElementById("rentalInputs");
    const rentalNumber = rentalInputs.children.length + 1;
    const rentals = await fetchData();

    // Create a container div for the rental content
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("rental-container");

    // Create the rental div
    const div = document.createElement("div");

    const selectLabel = document.createElement("label");
    selectLabel.textContent = "Select Vehicle Type:";
    div.appendChild(selectLabel);

    const select = document.createElement("select");
    select.name = `vehicle_${rentalNumber}_type`;
    select.disabled = disableInputs; // Disable the select for default rental

    rentals.forEach(rental => {
        const option = document.createElement("option");
        option.value = rental.vehicle;
        option.textContent = `${rental.vehicle} (${rental.capacity})`;
        select.appendChild(option);
    });

    div.appendChild(select);

    // Add rental period selection for each unit
    const rentalPeriodDiv = document.createElement("div");
    rentalPeriodDiv.classList.add("rental-period-div");
    const rentalPeriodLabel = document.createElement("label");
    rentalPeriodLabel.textContent = `Select Rental Period:`;
    rentalPeriodDiv.appendChild(rentalPeriodLabel);

    const halfDayLabel = document.createElement("label");
    const halfDayInput = document.createElement("input");
    halfDayInput.type = "radio";
    halfDayInput.name = `vehicle_${rentalNumber}_rental`;
    halfDayInput.value = "half-day";
    halfDayInput.addEventListener("change", updateTotalCost);
    halfDayInput.disabled = disableInputs; // Disable the radio buttons for default rental until valid dates selected
    halfDayLabel.appendChild(halfDayInput);
    halfDayLabel.appendChild(document.createTextNode("Half Day"));
    rentalPeriodDiv.appendChild(halfDayLabel);

    const fullDayLabel = document.createElement("label");
    const fullDayInput = document.createElement("input");
    fullDayInput.type = "radio";
    fullDayInput.name = `vehicle_${rentalNumber}_rental`;
    fullDayInput.value = "full-day";
    fullDayInput.addEventListener("change", updateTotalCost); // Add event listener
    fullDayInput.disabled = disableInputs; // Disable the radio buttons for default rental
    fullDayLabel.appendChild(fullDayInput);
    fullDayLabel.appendChild(document.createTextNode("Full Day"));
    rentalPeriodDiv.appendChild(fullDayLabel);

    div.appendChild(rentalPeriodDiv);

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", function () {
        rentalInputs.removeChild(containerDiv); // Remove the container div instead of rental div
        updateTotalCost();
    });
    containerDiv.appendChild(deleteButton); // Append delete button to the container div

    // Append the rental div to the container div
    containerDiv.appendChild(div);

    // Append the container div to rental inputs
    rentalInputs.appendChild(containerDiv);

    // If the rental duration is more than one day, disable the half-day option for all rentals
    const differenceInDays = calculateDifferenceInDays();
    if (differenceInDays > 0) {
        disableHalfDayOptions();
    }

    return containerDiv; // Return the container div
}


function calculateDifferenceInDays() {
    const pickupDate = document.getElementById("pickupdate").value;
    const returnDate = document.getElementById("returndate").value;
    if (pickupDate && returnDate) {
        const pickupDateObj = new Date(pickupDate);
        const returnDateObj = new Date(returnDate);
        return Math.ceil((returnDateObj - pickupDateObj) / (1000 * 60 * 60 * 24));
    }
    return 0;
}

function disableHalfDayOptions() {
    const rentalInputs = document.querySelectorAll(".rental-container");
    rentalInputs.forEach(rental => {
        const rentalPeriodDiv = rental.querySelector(".rental-period-div");
        const halfDayInput = rentalPeriodDiv.querySelector("input[value='half-day']");
        halfDayInput.disabled = true;
        if (halfDayInput.checked) {
            rentalPeriodDiv.querySelector("input[value='full-day']").checked = true;
        }
    });
}

function checkDatesBeforeSelection() {
    const pickupDate = document.getElementById("pickupdate").value;
    const returnDate = document.getElementById("returndate").value;
    const rentalInputs = document.querySelectorAll(".rental-container");

    if (pickupDate && returnDate) {
        const differenceInDays = calculateDifferenceInDays();

        rentalInputs.forEach(rental => {
            enableRentalInputsForSingle(rental);

            const rentalPeriodDiv = rental.querySelector(".rental-period-div");
            const halfDayInput = rentalPeriodDiv.querySelector("input[value='half-day']");
            if (differenceInDays > 1) {
                halfDayInput.disabled = true;
                if (halfDayInput.checked) {
                    rentalPeriodDiv.querySelector("input[value='full-day']").checked = true;
                }
            } else {
                halfDayInput.disabled = false;
            }
        });

        clearMessage();
    } else {
        rentalInputs.forEach(rental => {
            disableRentalInputs(rental);
        });
        displayMessage("Please enter both the pickup date and return date.");
    }
}

function disableAllRentalInputs() {
    const rentalDivs = document.querySelectorAll("[id^='rentalInputs'] > div");
    rentalDivs.forEach(div => {
        disableRentalInputs(div);
    });
}

function enableRentalInputs() {
    const rentalDivs = document.querySelectorAll("[id^='rentalInputs'] > div");
    rentalDivs.forEach(div => {
        enableRentalInputsForSingle(div);
    });
}

function disableRentalInputs(div) {
    if (!div) return;
    const rentalInputs = div.querySelectorAll("input, select");
    rentalInputs.forEach(input => {
        input.disabled = true;
    });
}

function enableRentalInputsForSingle(div) {
    if (!div) return;
    const rentalInputs = div.querySelectorAll("input, select");
    rentalInputs.forEach(input => {
        input.disabled = false;
    });
}

function displayMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}

function clearMessage() {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = "";
}

async function updateTotalCost() {
    console.log("Updating total cost...");

    let totalCost = 0;
    const rentals = document.querySelectorAll("[id^='rentalInputs'] > div");
    const rentalData = await fetchData();

    rentals.forEach(rental => {
        const vehicleType = rental.querySelector("select").value;
        const rentalTypeInput = rental.querySelector("input[name^='vehicle']:checked");

        if (rentalTypeInput) {
            const rentalType = rentalTypeInput.value;
            const rentalObject = rentalData.find(rental => rental.vehicle === vehicleType);

            if (rentalObject && rentalObject.cost) {
                // Retrieve the rental cost based on the selected rental type (half-day or full-day) and only consider reservation prices
                const rentalCost = rentalObject.cost.find(cost => cost.hasOwnProperty(`reservation-${rentalType}`));

                if (rentalCost) {
                    // Calculate number of days for the rental
                    const pickupDate = new Date(document.getElementById("pickupdate").value);
                    const returnDate = new Date(document.getElementById("returndate").value);
                    const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));

                    // Calculate total cost for the rental
                    let rentalTotalCost = 0;
                    if (days === 0) { // If rental is for the same day
                        rentalTotalCost = rentalCost[`reservation-${rentalType}`] * 1; // Get the rental period cost and multiply by 1
                    } else if (days > 0) { // For rentals spanning multiple days
                        rentalTotalCost = rentalCost[`reservation-${rentalType}`] * days; // Multiply rental period cost by number of days
                    }

                    totalCost += rentalTotalCost;

                    // Display rental cost
                    let rentalCostDiv = rental.querySelector(".rental-cost");
                    if (!rentalCostDiv) {
                        rentalCostDiv = document.createElement("div");
                        rentalCostDiv.classList.add("rental-cost");
                        rental.appendChild(rentalCostDiv);
                    }
                    if (days > 0) { // Display days only if days > 0
                        rentalCostDiv.textContent = `Cost: $${rentalTotalCost}, Days: ${days}`;
                    } else {
                        rentalCostDiv.textContent = `Cost: $${rentalTotalCost}`;
                    }
                    rentalCostDiv.classList.add("rentalCost");
                }
            }
        }
    });

    const totalCostElement = document.getElementById("totalCost");
    totalCostElement.textContent = `Total Cost: $${totalCost}`;
    totalCostElement.classList.add("totalCost");
}

