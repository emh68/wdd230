// // Use openweathermap.org API to get weather info
// const currentTemp = document.querySelector('#current-temp');
// const weatherIcon = document.querySelector('#weather-icon');
// const captionDesc = document.querySelector('figcaption');
// const windSpeed = document.querySelector('#wind-speed');
// const tempLow = document.querySelector('#temp-low');
// const tempHigh = document.querySelector('#temp-high');
// const windChill = document.querySelector('#wind-chill');


// const url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.761&lon=-111.891&appid=b2384255491935468122e0e1ee279982&units=imperial'

// async function apiFetch() {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             console.log(data);
//             displayResults(data);
//         } else {
//             throw Error(await response.text());
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }

// apiFetch();

// // Get current date and time
// function getCurrentDate() {
//     const currentDate = new Date();
//     const currentDay = currentDate.getDate();
//     console.log(currentDate);
//     console.log(currentDay);
// }
// getCurrentDate();

// function displayResults(data) {
//     currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
//     const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//     let desc = data.weather[0].description;
//     weatherIcon.setAttribute('src', iconsrc);
//     weatherIcon.setAttribute('alt', 'Weather icon');
//     captionDesc.textContent = `${desc}`;
//     let tempLowValue = data.main.temp_min;
//     tempLow.innerHTML = `${Math.floor(tempLowValue)}&deg;F`;
//     let tempHighValue = data.main.temp_max;
//     tempHigh.innerHTML = `${Math.round(tempHighValue)}&deg;F`;
//     let windSpeedValue = data.wind.speed;
//     windSpeed.innerHTML = `${Math.round(windSpeedValue)} mph`;
// }

// // windchill.js
// function calculateWindChill() {

//     const temperature = parseFloat(currentTemp.textContent);
//     const windSpeed = parseFloat(windSpeed.textContent);

//     console.log("Temperature:", temperature);
//     console.log("Wind Speed:", windSpeed);

//     // Check if the input values meet the specification limits
//     if (temperature <= 50 && windSpeed > 3.0) {
//         // Calculate wind chill factor using the formula
//         let windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);

//         // Round the result to whole number
//         windChill = Math.round(windChill);

//         // Display the wind chill factor on the webpage
//         // document.getElementById('windChillValue').innerText = windChill + ' °F';
//         document.getElementById('wind-chill').innerText = windChill;
//     } else {
//         // If input values do not meet the requirements, display "N/A"
//         document.getElementById('wind-chill').innerText = 'N/A';
//     }
// }

// // Call the calculateWindChillAndDisplay function
// calculateWindChill();

// Use openweathermap.org API to get weather info
// const url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.761&lon=-111.891&appid=b2384255491935468122e0e1ee279982&units=imperial';

// async function apiFetch() {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             console.log(data);
//             displayResults(data);
//             calculateWindChill(data.main.temp, data.wind.speed);
//         } else {
//             throw Error(await response.text());
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// apiFetch();

// // Get current date and time
// function getCurrentDate() {
//     const currentDate = new Date();
//     const currentDay = currentDate.getDate();
//     console.log(currentDate);
//     console.log(currentDay);
// }
// getCurrentDate();

// function displayResults(data) {
//     document.querySelector('#current-temp').innerHTML = `${Math.round(data.main.temp)}&deg;F`;
//     const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//     document.querySelector('#weather-icon').setAttribute('src', iconsrc);
//     document.querySelector('#weather-icon').setAttribute('alt', 'Weather icon');
//     document.querySelector('figcaption').textContent = `${data.weather[0].description}`;
//     document.querySelector('#temp-low').innerHTML = `${Math.floor(data.main.temp_min)}&deg;F`;
//     document.querySelector('#temp-high').innerHTML = `${Math.round(data.main.temp_max)}&deg;F`;
//     document.querySelector('#wind-speed').innerHTML = `${Math.round(data.wind.speed)} mph`;
// }

// function calculateWindChill(temperature, windSpeed) {
//     console.log("Temperature:", temperature);
//     console.log("Wind Speed:", windSpeed);

//     // Check if the input values meet the specification limits
//     if (temperature <= 50 && windSpeed > 3.0) {
//         // Calculate wind chill factor using the formula
//         let windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);

//         // Round the result to whole number
//         windChill = Math.round(windChill);

//         // Display the wind chill factor on the webpage
//         document.querySelector('#wind-chill').innerHTML = windChill;
//     } else {
//         // If input values do not meet the requirements, display "N/A"
//         document.querySelector('#wind-chill').innerHTML = 'N/A';
//     }
// }

// document.addEventListener('DOMContentLoaded', function () {
//     // Your JavaScript code here
//     const url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.761&lon=-111.891&appid=b2384255491935468122e0e1ee279982&units=imperial';
//     const windChillElement = document.querySelector('#wind-chill');

//     async function apiFetch() {
//         try {
//             const response = await fetch(url);
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);
//                 displayResults(data);
//                 calculateWindChill(data.main.temp, data.wind.speed);
//             } else {
//                 throw Error(await response.text());
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     apiFetch();

//     // Get current date and time
//     function getCurrentDate() {
//         const currentDate = new Date();
//         const currentDay = currentDate.getDate();
//         console.log(currentDate);
//         console.log(currentDay);
//     }
//     getCurrentDate();

//     function displayResults(data) {
//         document.querySelector('#current-temp').innerHTML = `${Math.round(data.main.temp)}&deg;F`;
//         const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//         document.querySelector('#weather-icon').setAttribute('src', iconsrc);
//         document.querySelector('#weather-icon').setAttribute('alt', 'Weather icon');
//         document.querySelector('figcaption').textContent = `${data.weather[0].description}`;
//         document.querySelector('#temp-low').innerHTML = `${Math.round(data.main.temp_min)}&deg;F`;
//         document.querySelector('#temp-high').innerHTML = `${Math.round(data.main.temp_max)}&deg;F`;
//         document.querySelector('#wind-speed').innerHTML = `${Math.round(data.wind.speed)} mph`;
//         document.querySelector('#wind-chill').innerHTML = `${Math.round(windChill)}&deg;F`;

//         calculateWindChill(data.main.temp, data.wind.speed);
//     }

//     function calculateWindChill(temperature, windSpeed) {
//         console.log("Temperature:", temperature);
//         console.log("Wind Speed:", windSpeed);

//         // Check if the input values meet the specification limits
//         if (temperature <= 50 && windSpeed > 3.0) {
//             // Calculate wind chill factor using the formula
//             let windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);

//             // Round the result to a whole number
//             windChill = Math.round(windChill);

//             // Display the wind chill factor on the webpage
//             windChillElement.innerText = windChill;
//         } else {
//             // If input values do not meet the requirements, display "N/A"
//             windChillElement.innerText = 'N/A';
//         }
//     }
// });


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

    // Get current date and time
    function getCurrentDate() {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        console.log(currentDate);
        console.log(currentDay);
    }
    getCurrentDate();

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
