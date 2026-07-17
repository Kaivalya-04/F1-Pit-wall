
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

    <circle id="car" r="10" fill="red" />

  </svg>
  `;

  const path = document.getElementById("trackPath");
  const car = document.getElementById("car");

  const length = path.getTotalLength();
  let progress = 0;

  function animate() {
    progress += 2;

    if (progress > length) progress = 0;

    const point = path.getPointAtLength(progress);

    car.setAttribute("cx", point.x);
    car.setAttribute("cy", point.y);

    requestAnimationFrame(animate);
  }

  animate();
}