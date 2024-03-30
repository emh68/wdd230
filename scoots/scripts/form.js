

// const rentalsData = "https://emh68.github.io/wdd230/scoots/data/rentals.json";

// async function fetchData() {
//     try {
//         const response = await fetch(rentalsData);
//         const data = await response.json();
//         return data.rentals;
//     } catch (error) {
//         console.error('Error fetching rental data:', error);
//         return [];
//     }
// }

// document.addEventListener("DOMContentLoaded", function () {
//     // Add event listener to the "Add Rental" button
//     const addRentalButton = document.getElementById("addRentalButton");
//     addRentalButton.addEventListener("click", addRental);

//     // Adding one rental by default when the page loads
//     addRental();
// });

// async function addRental() {
//     const rentalInputs = document.getElementById("rentalInputs");
//     const rentalNumber = rentalInputs.children.length + 1;
//     const rentals = await fetchData();

//     const div = document.createElement("div");

//     const selectLabel = document.createElement("label");
//     selectLabel.textContent = "Select Vehicle Type:";
//     div.appendChild(selectLabel);

//     const select = document.createElement("select");
//     select.name = `vehicle_${rentalNumber}_type`;

//     rentals.forEach(rental => {
//         const option = document.createElement("option");
//         option.value = rental.vehicle;
//         option.textContent = `${rental.vehicle} (${rental.capacity})`;
//         select.appendChild(option);
//     });

//     div.appendChild(select);

//     // Add rental period selection for each unit
//     const rentalPeriodDiv = document.createElement("div");
//     const rentalPeriodLabel = document.createElement("label");
//     rentalPeriodLabel.textContent = `Select Rental Period:`;
//     rentalPeriodDiv.appendChild(rentalPeriodLabel);

//     const halfDayInput = document.createElement("input");
//     halfDayInput.type = "radio";
//     halfDayInput.name = `vehicle_${rentalNumber}_rental`;
//     halfDayInput.value = "half-day";
//     halfDayInput.addEventListener("change", updateTotalCost); // Add event listener
//     rentalPeriodDiv.appendChild(halfDayInput);

//     const halfDayLabel = document.createElement("label");
//     halfDayLabel.textContent = "Half Day";
//     rentalPeriodDiv.appendChild(halfDayLabel);

//     const fullDayInput = document.createElement("input");
//     fullDayInput.type = "radio";
//     fullDayInput.name = `vehicle_${rentalNumber}_rental`;
//     fullDayInput.value = "full-day";
//     fullDayInput.addEventListener("change", updateTotalCost); // Add event listener
//     rentalPeriodDiv.appendChild(fullDayInput);

//     const fullDayLabel = document.createElement("label");
//     fullDayLabel.textContent = "Full Day";
//     rentalPeriodDiv.appendChild(fullDayLabel);

//     div.appendChild(rentalPeriodDiv);

//     // Add delete button
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "❌";
//     deleteButton.addEventListener("click", function () {
//         rentalInputs.removeChild(div);
//         updateTotalCost();
//     });
//     div.appendChild(deleteButton);

//     rentalInputs.appendChild(div);
// }

// async function updateTotalCost() {
//     console.log("Updating total cost...");

//     const rentals = document.querySelectorAll("[id^='rentalInputs'] > div");
//     let totalCost = 0;
//     const rentalData = await fetchData();

//     console.log("Rental data:", rentalData);

//     rentals.forEach(rental => {
//         const vehicleType = rental.querySelector("select").value;
//         console.log("Selected vehicle type:", vehicleType);

//         const rentalTypeInput = rental.querySelector("input[name^='vehicle']:checked");
//         if (rentalTypeInput) {
//             const rentalType = rentalTypeInput.value;
//             console.log("Selected rental type:", rentalType);

//             // Find the rental object in the data
//             const rentalObject = rentalData.find(rental => rental.vehicle === vehicleType);
//             console.log("Rental object:", rentalObject);

//             // Check if the rental object and cost array exist
//             if (rentalObject && rentalObject.cost) {
//                 // Get the cost based on the selected rental period
//                 const rentalCost = rentalObject.cost.find(cost => cost[rentalType]);
//                 if (rentalCost) {
//                     totalCost += rentalCost[rentalType];
//                     console.log("Rental cost:", rentalCost[rentalType]);
//                 }

//                 // Display the cost for the current rental
//                 let rentalCostDiv = rental.querySelector(".rental-cost");
//                 if (!rentalCostDiv) {
//                     rentalCostDiv = document.createElement("div");
//                     rentalCostDiv.classList.add("rental-cost");
//                     rental.appendChild(rentalCostDiv);
//                 }
//                 rentalCostDiv.textContent = `Cost: $${rentalCost[rentalType]}`;
//             }
//         }
//     });

//     console.log("Total cost:", totalCost);
//     document.getElementById("totalCost").textContent = `Total Cost: $${totalCost}`;
// }


const rentalsData = "https://emh68.github.io/wdd230/scoots/data/rentals.json";

async function fetchData() {
    try {
        const response = await fetch(rentalsData);
        const data = await response.json();
        return data.rentals;
    } catch (error) {
        console.error('Error fetching rental data:', error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    // Add one rental by default with inputs disabled
    addRental(true);

    // Add event listener to the "Add Rental" button
    const addRentalButton = document.getElementById("addRentalButton");
    addRentalButton.addEventListener("click", addRental);

    // Add event listener to check dates before selecting rental period or vehicle type
    const pickupDateInput = document.getElementById("pickupdate");
    const returnDateInput = document.getElementById("returndate");
    pickupDateInput.addEventListener("change", checkDatesBeforeSelection);
    returnDateInput.addEventListener("change", checkDatesBeforeSelection);
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

    const halfDayInput = document.createElement("input");
    halfDayInput.type = "radio";
    halfDayInput.name = `vehicle_${rentalNumber}_rental`;
    halfDayInput.value = "half-day";
    halfDayInput.addEventListener("change", updateTotalCost); // Add event listener
    halfDayInput.disabled = disableInputs; // Disable the radio buttons for default rental
    rentalPeriodDiv.appendChild(halfDayInput);

    const halfDayLabel = document.createElement("label");
    halfDayLabel.textContent = "Half Day";
    rentalPeriodDiv.appendChild(halfDayLabel);

    const fullDayInput = document.createElement("input");
    fullDayInput.type = "radio";
    fullDayInput.name = `vehicle_${rentalNumber}_rental`;
    fullDayInput.value = "full-day";
    fullDayInput.addEventListener("change", updateTotalCost); // Add event listener
    fullDayInput.disabled = disableInputs; // Disable the radio buttons for default rental
    rentalPeriodDiv.appendChild(fullDayInput);

    const fullDayLabel = document.createElement("label");
    fullDayLabel.textContent = "Full Day";
    rentalPeriodDiv.appendChild(fullDayLabel);

    div.appendChild(rentalPeriodDiv);

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", function () {
        rentalInputs.removeChild(div);
        updateTotalCost();
    });
    div.appendChild(deleteButton);

    rentalInputs.appendChild(div);
    return div;
}

function checkDatesBeforeSelection() {
    // Check if pickup date and return date are selected
    const pickupDate = document.getElementById("pickupdate").value;
    const returnDate = document.getElementById("returndate").value;

    // If both pickup date and return date are selected, enable rental inputs
    if (pickupDate && returnDate) {
        enableRentalInputs(); // Corrected here
        clearMessage();
    } else {
        // If either pickup date or return date is not selected, disable rental inputs and display message
        disableAllRentalInputs();
        displayMessage("Please enter the pickup date and return date.");
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
    if (!div) return; // Add this check to handle undefined div
    const rentalInputs = div.querySelectorAll("input, select");
    rentalInputs.forEach(input => {
        input.disabled = true;
    });
}

function enableRentalInputsForSingle(div) {
    if (!div) return; // Add this check to handle undefined div
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
                const rentalCost = rentalObject.cost.find(cost => cost[rentalType]);
                if (rentalCost) {
                    // Calculate number of days for the rental
                    const pickupDate = new Date(document.getElementById("pickupdate").value);
                    const returnDate = new Date(document.getElementById("returndate").value);
                    const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));

                    // Calculate total cost for the rental
                    const rentalTotalCost = rentalCost[rentalType] * days;
                    totalCost += rentalTotalCost;

                    // Display rental cost and number of days
                    let rentalCostDiv = rental.querySelector(".rental-cost");
                    if (!rentalCostDiv) {
                        rentalCostDiv = document.createElement("div");
                        rentalCostDiv.classList.add("rental-cost");
                        rental.appendChild(rentalCostDiv);
                    }
                    rentalCostDiv.textContent = `Cost: $${rentalTotalCost}, Days: ${days}`;
                }
            }
        }
    });

    document.getElementById("totalCost").textContent = `Total Cost: $${totalCost}`;
}
