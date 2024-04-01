// Weather API and calculate wind chill
document.addEventListener('DOMContentLoaded', function () {
    const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=20.5066&lon=-86.944&appid=b2384255491935468122e0e1ee279982&units=imperial';
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=20.5066&lon=-86.944&appid=b2384255491935468122e0e1ee279982&units=imperial';

    async function apiFetch() {
        try {
            const [currentResponse, forecastResponse] = await Promise.all([fetch(currentWeatherUrl), fetch(forecastUrl)]);
            if (currentResponse.ok && forecastResponse.ok) {
                const currentData = await currentResponse.json();
                const forecastData = await forecastResponse.json();

                displayResults(currentData, forecastData);

            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    apiFetch();

    function formatUnixTimestamp(timestamp) {
        const date = new Date(timestamp * 1000);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    }

    function displayResults(currentData, forecastData) {
        // Display current weather
        const currentMonthDay = formatUnixTimestamp(currentData.dt);
        document.querySelector('#current-month-day').innerHTML = currentMonthDay;
        document.querySelector('#current-temp').innerHTML = `${Math.round(currentData.main.temp)}&deg;F`;
        document.querySelector('#current-weather-icon').setAttribute('src', `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`);
        document.querySelector('#current-weather-icon').setAttribute('alt', 'Weather icon');
        document.querySelector('#current-desc').textContent = `${currentData.weather[0].description}`;
        document.querySelector('#current-temp-low').innerHTML = `${Math.round(currentData.main.temp_min)}&deg;F`;
        document.querySelector('#current-temp-high').innerHTML = `${Math.round(currentData.main.temp_max)}&deg;F`;
        document.querySelector('#current-wind-speed').innerHTML = `${Math.round(currentData.wind.speed)} mph`;
        document.querySelector('#current-humidity').innerHTML = `${Math.round(currentData.main.humidity)}%`;
        document.querySelector('.banner-temperature').innerHTML = `${Math.round(currentData.main.temp_max)}&deg;F`;

        // Display tomorrow's weather
        const tomorrowMonthDay = formatUnixTimestamp(forecastData.list[5].dt);
        document.querySelector('#tomorrow-month-day').innerHTML = tomorrowMonthDay;
        document.querySelector('#tomorrow-temp').innerHTML = `${Math.round(forecastData.list[5].main.temp)}&deg;F`;
        document.querySelector('#tomorrow-weather-icon').setAttribute('src', `https://openweathermap.org/img/w/${forecastData.list[5].weather[0].icon}.png`);
        document.querySelector('#tomorrow-weather-icon').setAttribute('alt', 'Weather icon');
        document.querySelector('#tomorrow-desc').textContent = `${forecastData.list[5].weather[0].description}`;
        document.querySelector('#tomorrow-temp-low').innerHTML = `${Math.round(forecastData.list[5].main.temp_min)}&deg;F`;
        document.querySelector('#tomorrow-temp-high').innerHTML = `${Math.round(forecastData.list[5].main.temp_max)}&deg;F`;
        document.querySelector('#tomorrow-wind-speed').innerHTML = `${Math.round(forecastData.list[5].wind.speed)} mph`;
        document.querySelector('#tomorrow-humidity').innerHTML = `${Math.round(forecastData.list[5].main.humidity)}%`;
        // Display day after tomorrow's weather
        const dayAfterTomorrowMonthDay = formatUnixTimestamp(forecastData.list[13].dt);
        document.querySelector('#day-after-tomorrow-month-day').innerHTML = dayAfterTomorrowMonthDay;
        document.querySelector('#day-after-tomorrow-temp').innerHTML = `${Math.round(forecastData.list[13].main.temp)}&deg;F`;
        document.querySelector('#day-after-tomorrow-weather-icon').setAttribute('src', `https://openweathermap.org/img/w/${forecastData.list[13].weather[0].icon}.png`);
        document.querySelector('#day-after-tomorrow-weather-icon').setAttribute('alt', 'Weather icon');
        document.querySelector('#day-after-tomorrow-desc').textContent = `${forecastData.list[13].weather[0].description}`;
        document.querySelector('#day-after-tomorrow-temp-low').innerHTML = `${Math.round(forecastData.list[13].main.temp_min)}&deg;F`;
        document.querySelector('#day-after-tomorrow-temp-high').innerHTML = `${Math.round(forecastData.list[13].main.temp_max)}&deg;F`;
        document.querySelector('#day-after-tomorrow-wind-speed').innerHTML = `${Math.round(forecastData.list[13].wind.speed)} mph`;
        document.querySelector('#day-after-tomorrow-humidity').innerHTML = `${Math.round(forecastData.list[13].main.humidity)}%`;
    }
});