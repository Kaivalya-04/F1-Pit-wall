/* =========================================
   SCUDERIA COMMAND
   TELEMETRY ENGINE
   Module 05
========================================= */

const telemetry =
    document.getElementById("telemetry");


// =========================================
// SELECTED DRIVER
// =========================================

let selectedDriver = "LEC";

let telemetryState = {

    speed: 0,
    gear: 0,
    rpm: 0,
    throttle: 0,
    brake: 0,
    ers: "STANDBY",
    tyreTemp: 0,
    fuel: 0,
    aero: "NORMAL"

};


// =========================================
// RANDOM TELEMETRY FALLBACK
// =========================================

function generateTelemetry() {

    const throttle =
        Math.floor(Math.random() * 101);

    const braking =
        throttle > 70
            ? 0
            : Math.floor(Math.random() * 101);


    telemetryState = {

        speed:
            Math.floor(
                100 + Math.random() * 220
            ),

        gear:
            Math.floor(
                1 + Math.random() * 8
            ),

        rpm:
            Math.floor(
                8000 + Math.random() * 4000
            ),

        throttle:

            throttle,

        brake:

            braking,

        ers:

            throttle > 80
                ? "DEPLOY"
                : throttle < 30
                    ? "HARVEST"
                    : "BALANCED",

        tyreTemp:

            Math.floor(
                85 + Math.random() * 25
            ),

        fuel:

            (
                35 +
                Math.random() * 15
            ).toFixed(1),

        aero:

            throttle > 85
                ? "LOW DRAG"
                : "HIGH DOWNFORCE"

    };


    renderTelemetry();

}


// =========================================
// RENDER TELEMETRY
// =========================================

function renderTelemetry() {

    if (!telemetry) {
        return;
    }


    telemetry.innerHTML = `

        <div class="telemetryHeader">

            <span>
                DRIVER
            </span>

            <strong>
                ${selectedDriver}
            </strong>

        </div>


        <div class="telemetryGrid">

            <div class="telemetryMetric">

                <span>SPEED</span>

                <strong>
                    ${telemetryState.speed}
                    <small>km/h</small>
                </strong>

            </div>


            <div class="telemetryMetric">

                <span>GEAR</span>

                <strong>
                    ${telemetryState.gear}
                </strong>

            </div>


            <div class="telemetryMetric">

                <span>RPM</span>

                <strong>
                    ${telemetryState.rpm}
                </strong>

            </div>


            <div class="telemetryMetric">

                <span>THROTTLE</span>

                <strong>
                    ${telemetryState.throttle}%
                </strong>

            </div>


            <div class="telemetryMetric">

                <span>BRAKE</span>

                <strong>
                    ${telemetryState.brake}%
                </strong>

            </div>


            <div class="telemetryMetric">

                <span>ERS</span>

                <strong>
                    ${telemetryState.ers}
                </strong>

            </div>


            <div class="telemetryMetric">

                <span>TYRE TEMP</span>

                <strong>
                    ${telemetryState.tyreTemp}
                    <small>°C</small>
                </strong>

            </div>


            <div class="telemetryMetric">

                <span>FUEL</span>

                <strong>
                    ${telemetryState.fuel}
                    <small>kg</small>
                </strong>

            </div>


            <div class="telemetryMetric">

                <span>AERO</span>

                <strong>
                    ${telemetryState.aero}
                </strong>

            </div>

        </div>

    `;

}


// =========================================
// REAL OPENF1 TELEMETRY
// =========================================

function processRealTelemetry(carData) {

    if (
        !carData ||
        carData.length === 0
    ) {
        return;
    }


    const latest =
        carData[carData.length - 1];


    if (!latest) {
        return;
    }


    telemetryState.speed =
        latest.speed ??
        telemetryState.speed;


    telemetryState.gear =
        latest.n_gear ??
        telemetryState.gear;


    telemetryState.rpm =
        latest.rpm ??
        telemetryState.rpm;


    telemetryState.throttle =
        latest.throttle ??
        telemetryState.throttle;


    telemetryState.brake =
        latest.brake ??
        telemetryState.brake;


    renderTelemetry();

}


// =========================================
// LIVE DATA EVENT
// =========================================

document.addEventListener(
    "scuderia:data",
    event => {

        const data =
            event.detail;


        if (!data) {
            return;
        }


        if (
            data.carData &&
            data.carData.length > 0
        ) {

            processRealTelemetry(
                data.carData
            );

        }

    }
);


// =========================================
// DRIVER SELECTOR EVENT
// =========================================

document.addEventListener(
    "scuderia:driver",
    event => {

        if (
            event.detail &&
            event.detail.code
        ) {

            selectedDriver =
                event.detail.code;

            generateTelemetry();

        }

    }
);


// =========================================
// INITIALIZE
// =========================================

generateTelemetry();


// =========================================
// FALLBACK UPDATE
// =========================================

setInterval(
    () => {

        if (
            !LiveData ||
            !LiveData.connected
        ) {

            generateTelemetry();

        }

    },
    2000
);


console.log(
    "[SCUDERIA COMMAND] Telemetry Engine online."
);