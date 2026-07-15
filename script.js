// ===============================
// Scuderia Command v1.2.0
// Dashboard Engine
// ===============================

// Live Clock
function updateClock() {
    const now = new Date();

    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();


// Default Session
document.getElementById("sessionName").textContent =
"2026 Grand Prix - Awaiting Live Session";


// Timing Tower
const tower = document.getElementById("timingTower");

function buildTimingTower() {

    tower.innerHTML = "<h2>Timing Tower</h2>";

    drivers.forEach(driver => {

        tower.innerHTML += `
        <div class="driverRow">

            <div class="position">
                P${driver.position}
            </div>

            <div class="driverCode">
                ${driver.code}
            </div>

            <div class="tyre">
                ${driver.tyre}
            </div>

            <div class="gap">
                ${driver.gap}
            </div>

        </div>
        `;

    });

}

buildTimingTower();
.driverRow{

display:grid;

grid-template-columns:50px 1fr 50px 80px;

padding:10px;

margin-bottom:8px;

background:#202020;

border-radius:8px;

align-items:center;

transition:.2s;

}

.driverRow:hover{

background:#2b2b2b;

}

.position{

font-weight:bold;
color:#E10600;

}

.driverCode{

font-weight:700;

font-size:18px;

}

.tyre{

text-align:center;

font-weight:bold;

color:#ffd54f;

}

.gap{

text-align:right;

color:#bdbdbd;

}
