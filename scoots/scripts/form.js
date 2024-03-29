// const vehicleTypes = ["Honda Metro Scooter (max. 1 person)", "Honda Dio Scooter (max. 2 people)", "Honda PCX150 Scooter (max. 2 people)", "Honda Pioneer ATV (max. 4 people)", "Jeep Wrangler - 2 door (max. 4 people)", "Jeep Wrangler - 4 door with a/c (max. 5 people)"];

// function addRental() {
//     const rentalInputs = document.getElementById("rentalInputs");
//     const rentalNumber = rentalInputs.children.length + 1;

//     const div = document.createElement("div");

//     const selectLabel = document.createElement("label");
//     selectLabel.textContent = "Select Vehicle Type:";
//     div.appendChild(selectLabel);

//     const select = document.createElement("select");
//     select.name = `vehicle_${rentalNumber}_type`;
//     vehicleTypes.forEach(type => {
//         const option = document.createElement("option");
//         option.value = type;
//         option.textContent = type;
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
//     rentalPeriodDiv.appendChild(halfDayInput);

//     const halfDayLabel = document.createElement("label");
//     halfDayLabel.textContent = "Half Day";
//     rentalPeriodDiv.appendChild(halfDayLabel);

//     const fullDayInput = document.createElement("input");
//     fullDayInput.type = "radio";
//     fullDayInput.name = `vehicle_${rentalNumber}_rental`;
//     fullDayInput.value = "full-day";
//     rentalPeriodDiv.appendChild(fullDayInput);

//     const fullDayLabel = document.createElement("label");
//     fullDayLabel.textContent = "Full Day";
//     rentalPeriodDiv.appendChild(fullDayLabel);

//     div.appendChild(rentalPeriodDiv);

//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "❌";
//     deleteButton.addEventListener("click", function () {
//         rentalInputs.removeChild(div);
//     });

//     div.appendChild(deleteButton);

//     rentalInputs.appendChild(div);
// }

// const rentalsData = "https://emh68.github.io/wdd230/scoots/data/rentals.json";

// async function addRental() {
//     const rentalInputs = document.getElementById("rentalInputs");
//     const rentalNumber = rentalInputs.children.length + 1;

//     const div = document.createElement("div");

//     const selectLabel = document.createElement("label");
//     selectLabel.textContent = `Select Vehicle Type: ${rentals.vehicle}`;
//     div.appendChild(selectLabel);

//     const select = document.createElement("select");
//     select.name = `vehicle_${rentalNumber}_type`;

//     // Fetch rental data from JSON file
//     try {
//         const response = await fetch(rentalsData);
//         const data = await response.json();
//         data.rentals.forEach(rental => {
//             const option = document.createElement("option");
//             option.value = rental.vehicle;
//             option.textContent = rental.vehicle;
//             select.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Error fetching rental data:', error);
//     }

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
//     rentalPeriodDiv.appendChild(halfDayInput);

//     const halfDayLabel = document.createElement("label");
//     halfDayLabel.textContent = "Half Day";
//     rentalPeriodDiv.appendChild(halfDayLabel);

//     const fullDayInput = document.createElement("input");
//     fullDayInput.type = "radio";
//     fullDayInput.name = `vehicle_${rentalNumber}_rental`;
//     fullDayInput.value = "full-day";
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

// function updateTotalCost() {
//     const rentals = document.querySelectorAll("[id^='rentalInputs'] > div");
//     let totalCost = 0;
//     rentals.forEach(rental => {
//         const vehicleType = rental.querySelector("select").value;
//         const rentalType = rental.querySelector("input[name^='vehicle']:checked").value;
//         // Here you would need to map the selected vehicle type to the cost from the JSON data
//         // Example: totalCost += vehicleCosts[vehicleType][rentalType];
//     });
//     document.getElementById("totalCost").textContent = `Total Cost: $${totalCost}`;
// }

// document.addEventListener("DOMContentLoaded", function () {
//     addRental(); // Adding one rental by default when the page loads
// });

// document.getElementById("rentalForm").addEventListener("change", updateTotalCost);

const rentalsData = "https://emh68.github.io/wdd230/scoots/data/rentals.json";

async function addRental() {
    const rentalInputs = document.getElementById("rentalInputs");
    const rentalNumber = rentalInputs.children.length + 1;

    const div = document.createElement("div");

    const selectLabel = document.createElement("label");
    selectLabel.textContent = "Select Vehicle Type:";
    div.appendChild(selectLabel);

    const select = document.createElement("select");
    select.name = `vehicle_${rentalNumber}_type`;

    // Fetch rental data from JSON file
    try {
        const response = await fetch(rentalsData);
        const data = await response.json();
        data.rentals.forEach(rental => {
            const option = document.createElement("option");
            option.value = rental.vehicle;
            option.textContent = `${rental.vehicle} (${rental.capacity})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching rental data:', error);
    }

    div.appendChild(select);

    // Add rental period selection for each unit
    const rentalPeriodDiv = document.createElement("div");
    const rentalPeriodLabel = document.createElement("label");
    rentalPeriodLabel.textContent = `Select Rental Period:`;
    rentalPeriodDiv.appendChild(rentalPeriodLabel);

    const halfDayInput = document.createElement("input");
    halfDayInput.type = "radio";
    halfDayInput.name = `vehicle_${rentalNumber}_rental`;
    halfDayInput.value = "half-day";
    rentalPeriodDiv.appendChild(halfDayInput);

    const halfDayLabel = document.createElement("label");
    halfDayLabel.textContent = "Half Day";
    rentalPeriodDiv.appendChild(halfDayLabel);

    const fullDayInput = document.createElement("input");
    fullDayInput.type = "radio";
    fullDayInput.name = `vehicle_${rentalNumber}_rental`;
    fullDayInput.value = "full-day";
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
}

function updateTotalCost() {
    const rentals = document.querySelectorAll("[id^='rentalInputs'] > div");
    let totalCost = 0;
    rentals.forEach(rental => {
        const vehicleType = rental.querySelector("select").value;
        const rentalType = rental.querySelector("input[name^='vehicle']:checked").value;
        const rentalCost = vehicleCosts[vehicleType][rentalType];
        totalCost += rentalCost;
        // Display the cost for the current rental
        const rentalCostDiv = rental.querySelector(".rental-cost");
        if (rentalCostDiv) {
            rentalCostDiv.textContent = `Cost: $${rentalCost}`;
        } else {
            const newRentalCostDiv = document.createElement("div");
            newRentalCostDiv.classList.add("rental-cost");
            newRentalCostDiv.textContent = `Cost: $${rentalCost}`;
            rental.appendChild(newRentalCostDiv);
        }
    });
    document.getElementById("totalCost").textContent = `Total Cost: $${totalCost}`;
}


document.addEventListener("DOMContentLoaded", function () {
    addRental(); // Adding one rental by default when the page loads
});

document.getElementById("rentalForm").addEventListener("change", updateTotalCost);