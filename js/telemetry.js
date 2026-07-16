const telemetry = document.getElementById("telemetry");

function updateTelemetry() {

    if (!telemetry) return;

    const speed = Math.floor(90 + Math.random() * 260);
    const gear = Math.min(8, Math.max(1, Math.floor(speed / 40)));
    const rpm = Math.floor(8000 + Math.random() * 4000);
    const throttle = Math.floor(Math.random() * 101);
    const brake = throttle < 20 ? Math.floor(60 + Math.random() * 40) : Math.floor(Math.random() * 20);
    const battery = Math.floor(70 + Math.random() * 30);
    const tyreTemp = Math.floor(85 + Math.random() * 20);
    const fuel = (40 + Math.random() * 10).toFixed(1);

    let ers = throttle > 80 ? "DEPLOY" : "HARVEST";
    let aero = speed > 250 ? "LOW DRAG" : "HIGH DOWNFORCE";

    telemetry.innerHTML = `
        <div class="telemetryRow"><span>Speed</span><span>${speed} km/h</span></div>
        <div class="telemetryRow"><span>Gear</span><span>${gear}</span></div>
        <div class="telemetryRow"><span>RPM</span><span>${rpm}</span></div>
        <div class="telemetryRow"><span>Throttle</span><span>${throttle}%</span></div>
        <div class="telemetryRow"><span>Brake</span><span>${brake}%</span></div>
        <div class="telemetryRow"><span>ERS</span><span>${ers}</span></div>
        <div class="telemetryRow"><span>Aero Mode</span><span>${aero}</span></div>
        <div class="telemetryRow"><span>Battery</span><span>${battery}%</span></div>
        <div class="telemetryRow"><span>Tyre Temp</span><span>${tyreTemp}°C</span></div>
        <div class="telemetryRow"><span>Fuel</span><span>${fuel} kg</span></div>
    `;
}

updateTelemetry();
setInterval(updateTelemetry, 500);