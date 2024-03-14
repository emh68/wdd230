// Use openweathermap.org API to get weather info
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const windSpeed = document.querySelector('#wind-speed');
const tempLow = document.querySelector('#temp-low');
const tempHigh = document.querySelector('#temp-high');


const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.761&lon=-111.891&appid=b2384255491935468122e0e1ee279982&units=imperial'

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log(error);
    }
}

apiFetch();

// Get current date and time
function getCurrentDate() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    console.log(currentDate);
    console.log(currentDay);
}
getCurrentDate();

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.list[0].main.temp)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    let desc = data.list[0].weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', 'Weather icon');
    captionDesc.textContent = `${desc}`;
    let tempLowValue = data.list[0].main.temp_min;
    tempLow.innerHTML = `${Math.floor(tempLowValue)}&deg;F`;
    let tempHighValue = data.list[0].main.temp_max;
    tempHigh.innerHTML = `${Math.round(tempHighValue)}&deg;F`;
    let windSpeedValue = data.list[0].wind.speed;
    windSpeed.innerHTML = `${Math.round(windSpeedValue)} mph`;
}

// windchill.js
function calculateWindChillAndDisplay() {
    // Check if the input values meet the specification limits
    if (currentTemp <= 50 && windSpeed > 3.0) {
        // Calculate wind chill factor using the formula
        let windChill = 35.74 + 0.6215 * currentTemp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);

        // Round the result to whole number
        windChill = Math.ceil(windChill);

        // Display the wind chill factor on the webpage
        // document.getElementById('windChillValue').innerText = windChill + ' °F';
        document.getElementById('windChillValue').innerText = windChill;
    } else {
        // If input values do not meet the requirements, display "N/A"
        document.getElementById('windChillValue').innerText = 'N/A';
    }
}

// Call the calculateWindChillAndDisplay function
calculateWindChillAndDisplay();

