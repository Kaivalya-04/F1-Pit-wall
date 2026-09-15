/* =========================================
   SCUDERIA COMMAND
   REAL TIMING TOWER
   Module 03
========================================= */

const timingTower =
    document.getElementById("timingTowerContents");

let timingData = [];

let latestDrivers = [];

let latestIntervals = [];


// =========================================
// FORMAT GAP
// =========================================

function formatGap(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "—";
    }

    if (value === 0 || value === "0") {
        return "LEADER";
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
        return value;
    }

    return `+${number.toFixed(3)}`;

}


// =========================================
// GET DRIVER INFO
// =========================================

function getDriverInfo(driverNumber) {

    if (!latestDrivers) {
        return null;
    }

    return latestDrivers.find(
        driver =>
            Number(driver.driver_number) ===
            Number(driverNumber)
    ) || null;

}


// =========================================
// GET TYRE
// =========================================

function getDriverTyre(driverNumber) {

    if (!LiveData || !LiveData.cache) {
        return "—";
    }

    const stints =
        LiveData.cache.stints || [];


    const driverStints =
        stints.filter(
            stint =>
                Number(stint.driver_number) ===
                Number(driverNumber)
        );


    if (driverStints.length === 0) {
        return "—";
    }


    const latest =
        driverStints[driverStints.length - 1];


    if (!latest.compound) {
        return "—";
    }


    return latest.compound.toUpperCase();

}


// =========================================
// TYRE CLASS
// =========================================

function tyreClass(compound) {

    if (!compound) {
        return "";
    }

    return compound
        .toLowerCase()
        .replace(" ", "-");

}


// =========================================
// BUILD LIVE TOWER
// =========================================

function buildLiveTower() {

    if (!timingTower) {
        return;
    }


    if (!latestIntervals ||
        latestIntervals.length === 0) {

        buildFallbackTower();

        return;
    }


    // Keep only the newest interval
    // for each driver.

    const driverMap = new Map();


    latestIntervals.forEach(interval => {

        const number =
            interval.driver_number;


        if (number === undefined) {
            return;
        }


        driverMap.set(
            Number(number),
            interval
        );

    });


    let rows =
        Array.from(driverMap.values());


    // Sort by position where available.

    rows.sort(
        (a, b) =>
            Number(a.position || 999) -
            Number(b.position || 999)
    );


    timingTower.innerHTML = "";


    rows.forEach((interval, index) => {

        const driverNumber =
            interval.driver_number;


        const driver =
            getDriverInfo(driverNumber);


        const position =
            interval.position ||
            index + 1;


        const code =
            driver?.name_acronym ||
            driver?.name ||
            `#${driverNumber}`;


        const team =
            driver?.team_name ||
            "Unknown";


        const tyre =
            getDriverTyre(driverNumber);


        const gap =
            interval.gap_to_leader ??
            interval.interval;


        const row =
            document.createElement("div");


        row.className =
            "timingRow";


        row.innerHTML = `

            <div class="timingPosition">
                ${position}
            </div>

            <div class="timingDriver">

                <strong>
                    ${code}
                </strong>

                <small>
                    ${team}
                </small>

            </div>

            <div class="timingTyre ${tyreClass(tyre)}">
                ${tyre}
            </div>

            <div class="timingGap">
                ${formatGap(gap)}
            </div>

        `;


        timingTower.appendChild(row);

    });

}


// =========================================
// FALLBACK TOWER
// =========================================

function buildFallbackTower() {

    if (!timingTower) {
        return;
    }


    if (
        typeof drivers === "undefined" ||
        !Array.isArray(drivers)
    ) {

        timingTower.innerHTML = `
            <div class="timingEmpty">
                No timing data available.
            </div>
        `;

        return;

    }


    timingTower.innerHTML = "";


    drivers.forEach((driver, index) => {

        const row =
            document.createElement("div");


        row.className =
            "timingRow";


        const code =
            driver.code ||
            driver.name_acronym ||
            driver.name ||
            `P${index + 1}`;


        const team =
            driver.team ||
            driver.team_name ||
            "Unknown";


        row.innerHTML = `

            <div class="timingPosition">
                ${index + 1}
            </div>

            <div class="timingDriver">

                <strong>
                    ${code}
                </strong>

                <small>
                    ${team}
                </small>

            </div>

            <div class="timingTyre">
                —
            </div>

            <div class="timingGap">
                —
            </div>

        `;


        timingTower.appendChild(row);

    });

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


        latestDrivers =
            data.drivers || [];


        latestIntervals =
            data.intervals || [];


        buildLiveTower();

    }
);


// =========================================
// INITIAL DISPLAY
// =========================================

buildFallbackTower();


// =========================================
// DEBUG
// =========================================

console.log(
    "[SCUDERIA COMMAND] Timing Tower online."
);