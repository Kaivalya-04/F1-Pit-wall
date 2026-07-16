const tower = document.getElementById("timingTowerContents");

function buildTimingTower() {
    if (!tower) return;

    tower.innerHTML = "<h2>Timing Tower</h2>";

    drivers.forEach(driver => {
        tower.innerHTML += `
        <div class="driverRow">
            <div class="position">P${driver.position}</div>
            <div class="driverCode">${driver.code}</div>
            <div class="team">${driver.team}</div>
            <div class="tyre">${driver.tyre}</div>
            <div class="gap">${driver.gap}</div>
        </div>
        `;
    });
}

buildTimingTower();
