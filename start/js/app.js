function getTime(date) {
    const dateObject = new Date(date);
    const formattedTime = dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedTime;
}
if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(function (position) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);


        const apiKey = "6b1d34bbc6b3437ac4081cb8f5a3f5b3";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(weatherData => {
                // Update DOM elements with current weather information
                const currentCity = document.querySelector(".currentCity");
                currentCity.textContent = weatherData.name;


                const degree = document.querySelector(".degree");
                degree.textContent = `${Math.round(weatherData.main.temp)}°`;

                const windSpeed = document.querySelector(".windSpeed");
                windSpeed.textContent = `${weatherData.wind.speed} km/h`;

                const realFeel = document.querySelector(".realFeel");
                realFeel.textContent = `${weatherData.main.feels_like}°`;

                const humidityLevel = document.querySelector(".humidityLevel");
                humidityLevel.textContent = `${weatherData.main.humidity}%`;

                const pressure = document.querySelector(".pressure");
                pressure.textContent = `${weatherData.main.pressure} hPa`;


                const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;


                const updateForecast = async () => {
                    const forecastData = await fetch(forecastApiUrl);
                    const forecastDataText = await forecastData.json();
                    console.log(forecastDataText);


                    const now = document.querySelector(".now");
                    now.textContent = `${getTime(forecastDataText.list[0].dt_txt)}`;
                    const nowdegree = document.querySelector(".nowdegree");
                    nowdegree.textContent = `${Math.round(forecastDataText.list[0].main.temp)}°`;

                    const threeHoursLater = document.querySelector(".threeHoursLater");
                    threeHoursLater.textContent = `${getTime(forecastDataText.list[1].dt_txt)}`;
                    const threeHoursLaterdegree = document.querySelector(".threeHoursLaterdegree");
                    threeHoursLaterdegree.textContent = `${Math.round(forecastDataText.list[1].main.temp)}°`;

                    const sixHoursLater = document.querySelector(".sixHoursLater");
                    sixHoursLater.textContent = `${getTime(forecastDataText.list[2].dt_txt)}`;
                    const sixHoursLaterdegree = document.querySelector(".sixHoursLaterdegree");
                    sixHoursLaterdegree.textContent = `${Math.round(forecastDataText.list[2].main.temp)}°`;

                    const nineHoursLater = document.querySelector(".nineHoursLater");
                    nineHoursLater.textContent = `${getTime(forecastDataText.list[3].dt_txt)}`;
                    const nineHoursLaterdegree = document.querySelector(".nineHoursLaterdegree");
                    nineHoursLaterdegree.textContent = `${Math.round(forecastDataText.list[3].main.temp)}°`;

                    const twelveHoursLater = document.querySelector(".twelveHoursLater");
                    twelveHoursLater.textContent = `${getTime(forecastDataText.list[4].dt_txt)}`;
                    const twelveHoursLaterdegree = document.querySelector(".twelveHoursLaterdegree");
                    twelveHoursLaterdegree.textContent = `${Math.round(forecastDataText.list[4].main.temp)}°`;

                    const fifteenHoursLater = document.querySelector(".fifteenHoursLater");
                    fifteenHoursLater.textContent = `${getTime(forecastDataText.list[5].dt_txt)}`;
                    const fifteenHoursLaterdegree = document.querySelector(".fifteenHoursLaterdegree");
                    fifteenHoursLaterdegree.textContent = `${Math.round(forecastDataText.list[5].main.temp)}°`;
                };

                updateForecast();
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }, function (error) {
        // Handle errors, if any
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
        }
    });
} else {
    console.error("Geolocation is not available in this browser.");
}


const body = document.body;

function updateBackground() {
    let now = new Date();
    let hours = now.getHours();


    if (hours >= 21 || hours < 6) {
        // Night time - dark blue linear gradient
        body.style.background = "linear-gradient(#001F3F, #003366)";
    } else if (hours >= 6 && hours < 12) {
        // Morning - light blue
        body.style.background = "linear-gradient(#FFDB58, #87CEEB)";
    } else {
        // Day time - default background colo
        body.style.background = "linear-gradient(#E57373, #DAA520)";
    }
}

updateBackground();

setInterval(updateBackground, 60000);




