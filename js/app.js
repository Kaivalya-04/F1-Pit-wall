
/* =========================================
   SCUDERIA COMMAND v2.3.0
   APPLICATION CONTROLLER
========================================= */

(() => {
    const welcome = document.getElementById("welcomeScreen");
    const mainApp = document.getElementById("mainApp");
    const connectionLabel = document.getElementById("connectionLabel");
    const driverSelector = document.getElementById("driverSelector");

    function showView(name) {
        const allowed = ["home", "timing", "track", "driver", "more"];
        if (!allowed.includes(name)) return;

        document.querySelectorAll(".app-view").forEach(view => {
            view.classList.toggle("active", view.id === `view-${name}`);
        });

        document.querySelectorAll(".nav-item").forEach(button => {
            const active = button.dataset.view === name;
            button.classList.toggle("active", active);
            button.setAttribute("aria-current", active ? "page" : "false");
        });

        window.scrollTo({ top: 0, behavior: "smooth" });

        if (name === "track") {
            window.dispatchEvent(new Event("resize"));
        }
    }

    function startApp() {
        welcome.classList.add("hidden");
        mainApp.classList.add("ready");
        showView("home");
    }

    document.addEventListener("click", event => {
        const button = event.target.closest("[data-view], [data-action]");
        if (!button) return;

        if (button.dataset.action === "get-started") {
            startApp();
            return;
        }

        if (button.dataset.action === "open-timing") {
            showView("timing");
            return;
        }

        if (button.dataset.view) {
            showView(button.dataset.view);
        }
    });

    if (driverSelector) {
        driverSelector.addEventListener("change", () => {
            const option = driverSelector.options[driverSelector.selectedIndex];
            const code = driverSelector.value;

            document.dispatchEvent(
                new CustomEvent("scuderia:driver", {
                    detail: { code, name: option ? option.textContent : code }
                })
            );
        });
    }

    // Keep the home page aligned with the selected session.
    document.addEventListener("click", event => {
        const sessionButton = event.target.closest(".sessionButton");
        if (!sessionButton) return;

        window.setTimeout(() => {
            const sessionName = document.getElementById("sessionName");
            const heroName = document.getElementById("heroSessionName");
            const heroDescription = document.getElementById("heroSessionDescription");

            if (sessionName && heroName) {
                heroName.textContent = sessionName.textContent.trim();
            }

            if (heroDescription) {
                heroDescription.textContent =
                    "Selected session · Check the data connection for live information.";
            }
        }, 0);
    });

    // Keep the existing clock element working.
    function updateClock() {
        const clock = document.getElementById("clock");
        if (!clock) return;

        clock.textContent = new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }).format(new Date());
    }

    updateClock();
    window.setInterval(updateClock, 1000);

    // Reflect actual connection state, not merely the selected session.
    function updateConnectionLabel() {
        if (!connectionLabel) return;

        const connected =
            typeof LiveData !== "undefined" &&
            LiveData.connected === true &&
            LiveData.lastUpdate instanceof Date;

        connectionLabel.textContent = connected
            ? "DATA CONNECTED"
            : "DATA STANDBY";

        const dot = document.querySelector(".connection-dot");
        if (dot) {
            dot.style.background = connected ? "#159b59" : "#e6a124";
        }
    }

    updateConnectionLabel();
    window.setInterval(updateConnectionLabel, 3000);

    document.addEventListener("scuderia:data", event => {
        const data = event.detail || {};
        const positions = document.getElementById("trackPositions");

        if (positions && Array.isArray(data.intervals) && data.intervals.length) {
            positions.textContent =
                `${data.intervals.length} driver interval records received. Open Live Timing for the tower.`;
        }
    });

    console.log("[SCUDERIA COMMAND] App controller ready.");
})();
