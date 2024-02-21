// windchill.js

function calculateWindChillAndDisplay() {
    // Set fixed values for temperature and wind speed
    const temperature = 35;
    const windSpeed = 5;

    // Display the temperature and wind speed on the webpage
    document.getElementById('temperature').innerText = temperature + ' °F';
    document.getElementById('windSpeed').innerText = windSpeed + ' mph';

    // Check if the input values meet the specification limits
    if (temperature <= 50 && windSpeed > 3.0) {
        // Calculate wind chill factor using the formula
        let windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);

        // Round the result to whole number
        windChill = Math.ceil(windChill);

        // Display the wind chill factor on the webpage
        document.getElementById('windChillValue').innerText = windChill + ' °F';
    } else {
        // If input values do not meet the requirements, display "N/A"
        document.getElementById('windChillValue').innerText = 'N/A';
    }
}

// Call the calculateWindChillAndDisplay function
calculateWindChillAndDisplay();
