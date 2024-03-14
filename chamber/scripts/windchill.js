
document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.761&lon=-111.891&appid=b2384255491935468122e0e1ee279982&units=imperial';

    async function apiFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                displayResults(data);
                calculateWindChill(data.main.temp, data.wind.speed);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    apiFetch();

    function displayResults(data) {
        document.querySelector('#current-temp').innerHTML = `${Math.round(data.main.temp)}&deg;F`;
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.querySelector('#weather-icon').setAttribute('src', iconsrc);
        document.querySelector('#weather-icon').setAttribute('alt', 'Weather icon');
        document.querySelector('figcaption').textContent = `${data.weather[0].description}`;
        document.querySelector('#temp-low').innerHTML = `${Math.round(data.main.temp_min)}&deg;F`;
        document.querySelector('#temp-high').innerHTML = `${Math.round(data.main.temp_max)}&deg;F`;
        document.querySelector('#wind-speed').innerHTML = `${Math.round(data.wind.speed)} mph`;
        const windChillElement = document.querySelector('#wind-chill');
        calculateWindChill(data.main.temp, data.wind.speed, windChillElement);
    }

    function calculateWindChill(temperature, windSpeed, windChillElement) {
        // Check if the input values meet the specification limits
        if (temperature <= 50 && windSpeed > 3.0) {
            // Calculate wind chill factor using the formula
            let windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);

            // Round the result to a whole number
            windChill = Math.round(windChill);

            document.querySelector('#wind-chill').innerHTML = `${windChill}&deg;F`;
        } else {
            // If input values do not meet the requirements, display "N/A"
            document.querySelector('#wind-chill').innerHTML = 'N/A';
        }
    }
});
