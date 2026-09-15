const grandPrixName = document.getElementById("grandPrixName");
const sessionName = document.getElementById("sessionName");
const missionStatus = document.getElementById("missionStatus");
const sessionSelector = document.getElementById("sessionSelector");


// =====================================
// CURRENT RACE WEEKEND
// =====================================

const CURRENT_GP = {
    name: "Hungarian Grand Prix",
    year: 2026
};


// =====================================
// DEFAULT SESSION
// =====================================

let currentSession = "race";


// =====================================
// UPDATE HEADER
// =====================================

function updateSessionHeader() {

    const selectedSession = SESSIONS.find(
        session => session.id === currentSession
    );

    if (!selectedSession) return;

    grandPrixName.textContent =
        `🏁 ${CURRENT_GP.name} ${CURRENT_GP.year}`;

    sessionName.textContent =
        selectedSession.name;

    missionStatus.textContent =
        "🟢 LIVE";
}


// =====================================
// BUILD SESSION SELECTOR
// =====================================

function buildSessionSelector() {

    if (!sessionSelector) return;

    sessionSelector.innerHTML = "";

    SESSIONS.forEach(session => {

        const button = document.createElement("button");

        button.className = "sessionButton";

        if (session.id === currentSession) {
            button.classList.add("active");
        }

        button.innerHTML = `
            <span class="sessionIcon">${session.icon}</span>
            <span>${session.name}</span>
        `;

        button.addEventListener("click", () => {

            currentSession = session.id;

            updateSessionHeader();

            buildSessionSelector();

            console.log(
                `[SCUDERIA COMMAND] Session changed: ${session.name}`
            );

        });

        sessionSelector.appendChild(button);

    });

}


// =====================================
// INITIALIZE
// =====================================

function initializeSessionManager() {

    if (typeof SESSIONS === "undefined") {

        console.error(
            "[SCUDERIA COMMAND] SESSIONS data not found."
        );

        if (sessionSelector) {
            sessionSelector.innerHTML =
                "Session data unavailable.";
        }

        return;
    }

    buildSessionSelector();

    updateSessionHeader();

}


// =====================================
// START
// =====================================

initializeSessionManager();