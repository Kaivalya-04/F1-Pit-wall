const track = document.getElementById("track");

if (track) {

    track.innerHTML = `
    <svg viewBox="0 0 1000 600" width="100%" height="420">

        <path
            id="trackPath"
            d="
            M140 300
            C140 150 260 80 420 80
            L620 80
            C810 80 900 170 900 300
            C900 430 810 520 620 520
            L420 520
            C260 520 140 450 140 300
            Z"
            fill="none"
            stroke="#777"
            stroke-width="18"
            stroke-linecap="round"
            stroke-linejoin="round"
        />

        <g id="cars"></g>

    </svg>
    `;

    const path = document.getElementById("trackPath");
    const carsGroup = document.getElementById("cars");

    const colors = [
        "#DC0000","#DC0000", // Ferrari
        "#FF8700","#FF8700", // McLaren
        "#3671C6","#3671C6", // Red Bull
        "#27F4D2","#27F4D2", // Mercedes
        "#006F62","#006F62", // Aston Martin
        "#64C4FF","#64C4FF", // Williams
        "#FF87BC","#FF87BC", // Alpine
        "#52E252","#52E252", // Sauber
        "#B6BABD","#B6BABD", // Haas
        "#6692FF","#6692FF", // Racing Bulls
        "#666666","#666666"  // Cadillac
    ];

    const codes = [
        "HAM","LEC",
        "NOR","PIA",
        "VER","TSU",
        "RUS","ANT",
        "ALO","STR",
        "ALB","SAI",
        "GAS","COL",
        "HUL","BOR",
        "OCO","BEA",
        "LAW","HAD",
        "PER","ZHO"
    ];

    const cars = [];

    for (let i = 0; i < 22; i++) {

        const marker = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );

        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        circle.setAttribute("r", "12");
        circle.setAttribute("fill", colors[i]);
        circle.setAttribute("stroke", "white");
        circle.setAttribute("stroke-width", "2");

        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        text.textContent = codes[i];
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", "8");
text.setAttribute("font-family", "Arial");
text.setAttribute("font-weight", "bold");
text.setAttribute("fill", "black");
text.setAttribute("text-anchor", "middle");
text.setAttribute("x", "0");
text.setAttribute("y", "3");
text.setAttribute("pointer-events", "none");
        marker.appendChild(circle);
        marker.appendChild(text);

        carsGroup.appendChild(marker);
        cars.push(marker);
    }

    const length = path.getTotalLength();
    let progress = 0;

    function animate() {

        progress += 2;

        if (progress > length)
            progress = 0;

        cars.forEach((car, i) => {

            const offset = (progress + i * (length / 22)) % length;

            const point = path.getPointAtLength(offset