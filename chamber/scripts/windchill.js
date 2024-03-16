document.addEventListener("DOMContentLoaded", function () {
    // Get the current day of the week (0 = Sun, 1 = Mon, etc.)
    const currentDayOfWeek = new Date().getDay();
    const banner = document.querySelector(".banner");

    // Check if it is Monday, Tuesday or Wednesday
    if (currentDayOfWeek >= 1 && currentDayOfWeek <= 3) {
        banner.style.display = "block"; // Show the banner
    } else {
        banner.style.display = "none"; // Hide the banner
    }

    // Close banner when closeButton clicked
    const closeButton = document.querySelector(".material-icons");
    closeButton.addEventListener("click", function () {
        banner.style.display = "none"; // Hide the banner when the close button is clicked
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=40.761&lon=-111.891&appid=b2384255491935468122e0e1ee279982&units=imperial';
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.761&lon=-111.891&appid=b2384255491935468122e0e1ee279982&units=imperial';

    async function apiFetch() {
        try {
            const [currentResponse, forecastResponse] = await Promise.all([fetch(currentWeatherUrl), fetch(forecastUrl)]);
            if (currentResponse.ok && forecastResponse.ok) {
                const currentData = await currentResponse.json();
                const forecastData = await forecastResponse.json();

                displayResults(currentData, forecastData);
                const currentWindChillElement = document.querySelectorAll('#current-wind-chill');
                const tomorrowWindChillElement = document.querySelectorAll('#tomorrow-wind-chill');
                const dayAfterTomorrowWindChillElement = document.querySelectorAll('#day-after-tomorrow-wind-chill');
                calculateWindChill(currentData.main.temp, currentData.wind.speed, currentWindChillElement);
                calculateWindChill(forecastData.list[1].main.temp, forecastData.list[1].wind.speed, tomorrowWindChillElement);
                calculateWindChill(forecastData.list[9].main.temp, forecastData.list[9].wind.speed, dayAfterTomorrowWindChillElement);

            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    apiFetch();

    function displayResults(currentData, forecastData) {
        // Display current weather
        document.querySelector('#current-temp').innerHTML = `${Math.round(currentData.main.temp)}&deg;F`;
        document.querySelector('#current-weather-icon').setAttribute('src', `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`);
        document.querySelector('#current-weather-icon').setAttribute('alt', 'Weather icon');
        document.querySelector('#current-desc').textContent = `${currentData.weather[0].description}`;
        document.querySelector('#current-temp-low').innerHTML = `${Math.round(currentData.main.temp_min)}&deg;F`;
        document.querySelector('#current-temp-high').innerHTML = `${Math.round(currentData.main.temp_max)}&deg;F`;
        document.querySelector('#current-wind-speed').innerHTML = `${Math.round(currentData.wind.speed)} mph`;

        // Display tomorrow's weather
        document.querySelector('#tomorrow-temp').innerHTML = `${Math.round(forecastData.list[1].main.temp)}&deg;F`;
        document.querySelector('#tomorrow-weather-icon').setAttribute('src', `https://openweathermap.org/img/w/${forecastData.list[1].weather[0].icon}.png`);
        document.querySelector('#tomorrow-weather-icon').setAttribute('alt', 'Weather icon');
        document.querySelector('#tomorrow-desc').textContent = `${forecastData.list[1].weather[0].description}`;
        document.querySelector('#tomorrow-temp-low').innerHTML = `${Math.round(forecastData.list[1].main.temp_min)}&deg;F`;
        document.querySelector('#tomorrow-temp-high').innerHTML = `${Math.round(forecastData.list[1].main.temp_max)}&deg;F`;
        document.querySelector('#tomorrow-wind-speed').innerHTML = `${Math.round(forecastData.list[1].wind.speed)} mph`;

        // Display day after tomorrow's weather
        document.querySelector('#day-after-tomorrow-temp').innerHTML = `${Math.round(forecastData.list[9].main.temp)}&deg;F`;
        document.querySelector('#day-after-tomorrow-weather-icon').setAttribute('src', `https://openweathermap.org/img/w/${forecastData.list[9].weather[0].icon}.png`);
        document.querySelector('#day-after-tomorrow-weather-icon').setAttribute('alt', 'Weather icon');
        document.querySelector('#day-after-tomorrow-desc').textContent = `${forecastData.list[9].weather[0].description}`;
        document.querySelector('#day-after-tomorrow-temp-low').innerHTML = `${Math.round(forecastData.list[9].main.temp_min)}&deg;F`;
        document.querySelector('#day-after-tomorrow-temp-high').innerHTML = `${Math.round(forecastData.list[9].main.temp_max)}&deg;F`;
        document.querySelector('#day-after-tomorrow-wind-speed').innerHTML = `${Math.round(forecastData.list[9].wind.speed)} mph`;

    }

    function calculateWindChill(temperature, windSpeed, windChillElements) {
        // Check if the input values meet the specification limits
        if (temperature <= 50 && windSpeed > 3.0) {
            // Calculate wind chill factor using the formula
            let windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);

            // Round the result to a whole number
            windChill = Math.round(windChill);

            // Update wind chill for each element
            windChillElements.forEach(element => {
                // Display wind chill
                element.innerHTML = `Wind chill: ${windChill}&deg;F`;
                // Show wind chill element
                element.style.display = 'inline';
            });
        } else {
            // If input values do not meet the requirements, hide wind chill for each element
            windChillElements.forEach(element => {
                // Hide wind chill
                element.style.display = 'none';
            });
        }
    }

});