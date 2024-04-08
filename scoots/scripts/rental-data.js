const rentalsData = "https://emh68.github.io/wdd230/scoots/data/rentals.json";

async function fetchData() {
    try {
        const response = await fetch(rentalsData);
        const data = await response.json();
        return data.rentals;
    } catch (error) {
        console.error('Error fetching rental data:', error);
        return undefined; // Adjust error handling as needed
    }
}

function populateTable() {
    fetchData()
        .then(rentals => {
            const tableBody = document.getElementById('rentalBody');

            rentals.forEach(rental => {
                const row = document.createElement('tr');

                // Rental Type
                const vehicleCell = document.createElement('td');
                vehicleCell.textContent = rental.vehicle;
                row.appendChild(vehicleCell);

                // Max People
                const capacityCell = document.createElement('td');
                capacityCell.textContent = rental.capacity.match(/\d+/)[0];
                row.appendChild(capacityCell);

                // Reservation Half Day
                const reservationHalfDayCell = document.createElement('td');
                reservationHalfDayCell.textContent = `$${rental.cost[0]['reservation-half-day'] || ''}`;
                row.appendChild(reservationHalfDayCell);

                // Reservation Full Day
                const reservationFullDayCell = document.createElement('td');
                reservationFullDayCell.textContent = `$${rental.cost[1]['reservation-full-day'] || ''}`;
                row.appendChild(reservationFullDayCell);

                // Walk-In Half Day
                const walkInHalfDayCell = document.createElement('td');
                walkInHalfDayCell.textContent = `$${rental.cost[0]['walk-in-half-day'] || ''}`;
                row.appendChild(walkInHalfDayCell);

                // Walk-In Full Day
                const walkInFullDayCell = document.createElement('td');
                walkInFullDayCell.textContent = `$${rental.cost[1]['walk-in-full-day'] || ''}`;
                row.appendChild(walkInFullDayCell);


                // Append the row to the table body
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error populating table:', error);
        });
}

// Call the function to populate the table
populateTable();
