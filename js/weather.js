const weather = document.getElementById("weather");

function updateWeather() {

    if (!weather) return;

    const airTemp = Math.floor(22 + Math.random() * 12);
    const trackTemp = airTemp + Math.floor(8 + Math.random() * 12);
    const humidity = Math.floor(35 + Math.random() * 40);
    const wind = Math.floor(2 + Math.random() * 20);
    const rainChance = Math.floor(Math.random() * 40);

    let trackStatus = "DRY";

    if (rainChance > 25) {
        trackStatus = "LIGHT RAIN";
    }

    if (rainChance > 35) {
        trackStatus = "WET";
    }

    weather.innerHTML = `
        <h2>Weather</h2>

        <div class="telemetryRow">
            <span>Air Temp</span>
            <span>${airTemp}°C</span>
        </div>

        <div class="telemetryRow">
            <span>Track Temp</span>
            <span>${trackTemp}°C</span>
        </div>

        <div class="telemetryRow">
            <span>Humidity</span>
            <span>${humidity}%</span>
        </div>

        <div class="telemetryRow">
            <span>Wind</span>
            <span>${wind} km/h</span>
        </div>

        <div class="telemetryRow">
            <span>Rain Chance</span>
            <span>${rainChance}%</span>
        </div>

        <div class="telemetryRow">
            <span>Track</span>
            <span>${trackStatus}</span>
        </div>
    `;
}

updateWeather();
setInterval(updateWeather, 5000);
