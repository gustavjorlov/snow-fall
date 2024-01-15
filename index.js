const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var simplex = new SimplexNoise();

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const numberOfParticles = 1;
const showParticles = true;
const particleOpacity = 0.2;
const particleRadius = 2;
const showMouse = true;

const renderDot = (dot) => {
  ctx.beginPath();
  ctx.arc(dot.position.x, dot.position.y, dot.radius, 0, Math.PI * 2);
  ctx.fillStyle = dot.color || "#ccc";
  ctx.fill();
  ctx.closePath();
};

let mouseDot = {
  radius: 1,
  speed: { value: 0, direction: { x: 0, y: 0 } },
  position: { x: -10, y: -10 },
  color: `rgba(255,255,255,1)`,
};

let particles = []; /*Array(numberOfParticles)
  .fill(0)
  .map((_, i) => ({
    position: {
      x: Math.round(canvas.width * Math.random()),
      y: Math.round(canvas.height * Math.random()),
    },
    color: `rgba(255,255,255,${Math.random()})`,
    radius: particleRadius,
    speed: 1,
    angle: 360 * Math.random(),
  }));*/

const spawnParticle = (position) => {
  particles.push({
    position,
    color: `rgba(255,255,255,${Math.random() * 0.5})`,
    radius: particleRadius * Math.random(),
    speed: 1,
    angle: 360 * Math.random(),
  });
};

canvas.addEventListener("mousemove", (e) => {
  mouseDot.position = { x: e.offsetX, y: e.offsetY };
  // spawnParticle({ x: e.offsetX, y: e.offsetY });
  // spawnParticle({ x: e.offsetX, y: e.offsetY });
  // spawnParticle({ x: e.offsetX, y: e.offsetY });
  // spawnParticle({ x: e.offsetX, y: e.offsetY });
});

function update(timestamp) {
  for (let i = 0; i < particles.length; i++) {
    particles[i].position.y +=
      1 + simplex.noise(i / 10000, (i * timestamp) / 10000);
    particles[i].position.x += simplex.noise(i / 10000, (i * timestamp) / 2000);
  }
  spawnParticle({ x: canvas.width * Math.random(), y: 0 });
  spawnParticle({ ...mouseDot.position });
  spawnParticle({ ...mouseDot.position });
  spawnParticle({ ...mouseDot.position });
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (showParticles) particles.map(renderDot);
  // if (showMouse) renderDot(mouseDot);
}
let lastTimestamp = 0;
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTimestamp;

  if (deltaTime >= 16.67) {
    lastTimestamp = timestamp;
    update(timestamp);
    render();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
