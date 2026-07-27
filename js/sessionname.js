const grandPrixName = document.getElementById("grandPrixName");
const sessionName = document.getElementById("sessionName");
const missionStatus = document.getElementById("missionStatus");

function updateSession() {

    grandPrixName.textContent = "🏁 Hungarian Grand Prix 2026";

    sessionName.textContent = "Race";

    missionStatus.textContent = "🟢 LIVE";
}

updateSession();