const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feelsLike");
const countryName = document.getElementById("countryName");
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind =document.getElementById("wind");
const date = document.getElementById("date");
const loading = document.getElementById("loading");
const locationButton = document.getElementById("locationButton");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");
function getWeatherCondition(code) {

    if (code === 0) {
        weatherIcon.textContent = "☀️";
        return "Clear Sky";
    }

    if (code === 1) {
        weatherIcon.textContent = "🌤️";
        return "Mainly Clear";
    }

    if (code === 2) {
        weatherIcon.textContent = "⛅";
        return "Partly Cloudy";
    }

    if (code === 3) {
        weatherIcon.textContent = "☁️";
        return "Cloudy";
    }

    if (code >= 51 && code <= 67) {
        weatherIcon.textContent = "🌧️";
        return "Rain";
    }

    if (code >= 71 && code <= 77) {
        weatherIcon.textContent = "❄️";
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        weatherIcon.textContent = "🌦️";
        return "Rain Showers";
    }

    if (code >= 95) {
        weatherIcon.textContent = "⛈️";
        return "Thunderstorm";
    }

    weatherIcon.textContent = "🌤️";
    return "Unknown";
}
searchButton.onclick = async function () {
 try{
    loading.style.display = "block";
    searchButton.disabled = true;
    
errorMessage.textContent = "";
   let city = cityInput.value.trim();
   if (city === "") {
    loading.style.display = "none";
    errorMessage.textContent = "❌ Please enter a city name.";
    return;
}

if (city.toLowerCase() === "wolkite") {
    city = "Welkite";
}
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json&countryCode=ET`;
const response = await fetch(url);
    const data = await response.json();
if (!data.results || data.results.length === 0) {
    loading.style.display = "none";
    searchButton.disabled = false;

    errorMessage.textContent =
        "❌ City not found. Try another spelling.";

    return;
}

errorMessage.textContent = "";

const location = data.results[0];
    cityName.textContent = location.name;
    countryName.textContent = location.country;
    console.log("City:", location.name);
    console.log("Country:", location.country);
    console.log("Latitude:", location.latitude);
    console.log("Longitude:", location.longitude);


    const latitude = location.latitude;
    const longitude = location.longitude;

    const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    const cityTime = new Date(weatherData.current.time);

date.textContent = cityTime.toLocaleString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
});
    const weatherCode = weatherData.current.weather_code;

condition.textContent = getWeatherCondition(weatherCode);

feelsLike.textContent =
    weatherData.current.apparent_temperature + "°C";
   temperature.textContent = weatherData.current.temperature_2m + "°C";

humidity.textContent = weatherData.current.relative_humidity_2m + "%";

wind.textContent = weatherData.current.wind_speed_10m + " km/h";
loading.style.display = "none";
searchButton.disabled = false;
} catch (error) {
    console.error("Error fetching weather data:", error);
       loading.style.display = "none";
       searchButton.disabled = false;
    errorMessage.textContent = "❌ Error fetching weather data. Please try again.";
}
};
cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchButton.click();
    }
});locationButton.onclick = function () {

    if (!navigator.geolocation) {
        errorMessage.textContent =
            "❌ Geolocation is not supported by your browser.";
        return;
    }

    loading.style.display = "block";
    errorMessage.textContent = "";

    navigator.geolocation.getCurrentPosition(

    async function (position) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const locationUrl =
    `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&format=json`;

const locationResponse = await fetch(locationUrl);
const locationData = await locationResponse.json();

console.log(locationData);

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`;

        const response = await fetch(weatherUrl);
        const data = await response.json();
        const cityTime = new Date(data.current.time);

date.textContent = cityTime.toLocaleString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
});

        const weatherCode = data.current.weather_code;
        if (locationData.results && locationData.results.length > 0) {
    cityName.textContent = locationData.results[0].name;
    countryName.textContent = locationData.results[0].country;
} else {
    cityName.textContent = "My Location";
    countryName.textContent = "Ethiopia";
}
temperature.textContent =
    data.current.temperature_2m + "°C";

humidity.textContent =
    data.current.relative_humidity_2m + "%";

wind.textContent =
    data.current.wind_speed_10m + " km/h";

feelsLike.textContent =
    data.current.apparent_temperature + "°C";

condition.textContent =
    getWeatherCondition(weatherCode);

loading.style.display = "none";
    },

    function (error) {
        loading.style.display = "none";

        errorMessage.textContent =
            "❌ Unable to get your location.";

        console.error(error);
    }
)};