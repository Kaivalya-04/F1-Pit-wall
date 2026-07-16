const track = document.getElementById("track");

if (track) {
    track.innerHTML = `
    <svg viewBox="0 0 800 450" width="100%" height="100%">
        <path id="trackPath"
              d="M120 220
                 C120 80 680 80 680 220
                 C680 360 120 360 120 220"
              fill="none"
              stroke="#777"
              stroke-width="8"/>

        <circle id="leader"
                r="8"
                fill="#ff0000"/>
    </svg>
    `;

    const path = document.getElementById("trackPath");
    const car = document.getElementById("leader");

    const length = path.getTotalLength();

    let progress = 0;

    function animateCar() {

        progress += 1;

        if (progress > 100)
            progress = 0;

        const point = path.getPointAtLength(
            length * progress / 100
        );

        car.setAttribute("cx", point.x);
        car.setAttribute("cy", point.y);

        requestAnimationFrame(animateCar);
    }

    animateCar();
}