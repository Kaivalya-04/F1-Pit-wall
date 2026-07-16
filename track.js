const track = document.getElementById("track");

track.innerHTML = `
<svg id="trackSvg" viewBox="0 0 800 500" width="100%" height="400">
    <ellipse
        cx="400"
        cy="250"
        rx="300"
        ry="120"
        fill="none"
        stroke="#888"
        stroke-width="8"
        id="trackPath"
    />
</svg>
`;

const svg = document.getElementById("trackSvg");
const path = document.getElementById("trackPath");

const length = path.getTotalLength();

drivers.forEach((driver, i) => {
    const car = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    car.setAttribute("r", "6");
    car.setAttribute("fill", i < 2 ? "red" : "#00ff99");

    svg.appendChild(car);

    const point = path.getPointAtLength((length / drivers.length) * i);

    car.setAttribute("cx", point.x);
    car.setAttribute("cy", point.y);
});