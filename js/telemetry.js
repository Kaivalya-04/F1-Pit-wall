
/* =========================================
   SCUDERIA COMMAND v2.3.1
   TELEMETRY ENGINE — UPDATE FIX
========================================= */

(() => {
    const telemetryElement = document.getElementById("telemetry");

    let selectedDriver = "LEC";
    let usingRealData = false;

    const state = {
        speed: 0,
        gear: 1,
        rpm: 8000,
        throttle: 0,
        brake: 0,
        ers: "STANDBY",
        tyreTemp: 90,
        fuel: 45.0,
        aero: "HIGH DOWNFORCE"
    };

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateTelemetry() {
        // Generate a plausible simulated snapshot.
        const throttle = randomInt(0, 100);
        const braking = throttle > 75 ? 0 : randomInt(0, 85);

        state.speed = randomInt(90, 330);
        state.gear = randomInt(1, 8);
        state.rpm = randomInt(8000, 12000);
        state.throttle = throttle;
        state.brake = braking;
        state.ers = throttle > 80
            ? "DEPLOY"
            : throttle < 30
                ? "HARVEST"
                : "BALANCED";
        state.tyreTemp = randomInt(85, 110);
        state.fuel = Number((35 + Math.random() * 15).toFixed(1));
        state.aero = throttle > 85 ? "LOW DRAG" : "HIGH DOWNFORCE";

        renderTelemetry();
    }

    function renderTelemetry() {
        if (telemetryElement) {
            telemetryElement.innerHTML = `
                <div class="telemetryHeader">
                    <span>SELECTED DRIVER</span>
                    <strong>${selectedDriver}</strong>
                </div>

                <div class="telemetryGrid">
                    <div class="telemetryMetric">
                        <span>SPEED</span>
                        <strong>${state.speed} <small>km/h</small></strong>
                    </div>
                    <div class="telemetryMetric">
                        <span>GEAR</span>
                        <strong>${state.gear}</strong>
                    </div>
                    <div class="telemetryMetric">
                        <span>RPM</span>
                        <strong>${state.rpm}</strong>
                    </div>
                    <div class="telemetryMetric">
                        <span>THROTTLE</span>
                        <strong>${state.throttle}%</strong>
                    </div>
                    <div class="telemetryMetric">
                        <span>BRAKE</span>
                        <strong>${state.brake}%</strong>
                    </div>
                    <div class="telemetryMetric">
                        <span>ERS</span>
                        <strong>${state.ers}</strong>
                    </div>
                    <div class="telemetryMetric">
                        <span>TYRE TEMP</span>
                        <strong>${state.tyreTemp}<small> °C</small></strong>
                    </div>
                    <div class="telemetryMetric">
                        <span>FUEL</span>
                        <strong>${state.fuel}<small> kg</small></strong>
                    </div>
                    <div class="telemetryMetric">
                        <span>AERO MODE</span>
                        <strong>${state.aero}</strong>
                    </div>
                </div>
            `;
        }

        // Send the exact same values to the graph module.
        document.dispatchEvent(
            new CustomEvent("scuderia:telemetry", {
                detail: { ...state, driver: selectedDriver }
            })
        );
    }

    function processRealTelemetry(carData) {
        if (!carData) return;

        const latest = Array.isArray(carData)
            ? carData[carData.length - 1]
            : carData;

        if (!latest) return;

        // Accept only a record containing actual car telemetry.
        if (
            latest.speed == null &&
            latest.rpm == null &&
            latest.n_gear == null
        ) return;

        if (latest.speed != null) state.speed = latest.speed;
        if (latest.n_gear != null) state.gear = latest.n_gear;
        if (latest.rpm != null) state.rpm = latest.rpm;
        if (latest.throttle != null) state.throttle = latest.throttle;
        if (latest.brake != null) state.brake = latest.brake;

        usingRealData = true;
        renderTelemetry();
    }

    document.addEventListener("scuderia:data", event => {
        const data = event.detail;
        if (!data) return;

        if (data.carData) {
            processRealTelemetry(data.carData);
        }
    });

    document.addEventListener("scuderia:driver", event => {
        const driver = event.detail;
        if (!driver || !driver.code) return;

        selectedDriver = driver.code;
        usingRealData = false;

        // Immediately show a fresh snapshot for the selected driver.
        generateTelemetry();
    });

    // Start immediately so the UI is never left blank.
    generateTelemetry();

    // Check for a genuinely active data connection safely.
    window.setInterval(() => {
        const liveDataExists = typeof LiveData !== "undefined";
        const connected = liveDataExists && LiveData.connected === true;

        if (!connected) {
            usingRealData = false;
            generateTelemetry();
        }
    }, 2000);

    console.log("[SCUDERIA COMMAND] Telemetry update fix loaded.");
})();
