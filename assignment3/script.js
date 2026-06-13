const frameCount = 200;

const canvas = document.getElementById("bikeCanvas");
const ctx = canvas.getContext("2d");
const heroText = document.getElementById("heroText");
const hotspots = document.getElementById("hotspots");

// Account for device pixel ratio (Retina/HiDPI displays)
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = window.innerWidth;
  const cssHeight = window.innerHeight;

  // Set the canvas internal resolution to match physical pixels
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;

  // Scale the drawing context so coordinates still use CSS pixels
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function positionHotspots() {
  const frameWidth = 1280;
  const frameHeight = 720;

  // Use CSS pixel dimensions (innerWidth/Height), not canvas.width/height
  // because canvas.width is now in physical pixels
  const cssWidth = window.innerWidth;
  const cssHeight = window.innerHeight;

  const scale = Math.min(cssWidth / frameWidth, cssHeight / frameHeight);

  const renderedWidth = frameWidth * scale;
  const renderedHeight = frameHeight * scale;

  const offsetX = (cssWidth - renderedWidth) / 2;
  const offsetY = (cssHeight - renderedHeight) / 2;

  placePart("mainframe", 164, 97, 678, 410);
  placePart("engine", 551, 342, 181, 207);
  placePart("exhaust", 286, 462, 444, 128);
  placePart("fuel", 501, 89, 278, 132);
  placePart("cowling", 839, 28, 336, 346);
  placePart("suspension", 841, 345, 148, 236);

  function placePart(id, x, y, width, height) {
    const part = document.getElementById(id);
    part.style.left = `${offsetX + x * scale}px`;
    part.style.top = `${offsetY + y * scale}px`;
    part.style.width = `${width * scale}px`;
    part.style.height = `${height * scale}px`;
  }
}

const currentFrame = (index) => `frames/${String(index).padStart(4, "0")}.png`;

const images = [];
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

function drawFrame(index) {
  const img = images[index];
  if (!img.complete) return;

  // Use CSS pixel dimensions for drawing since ctx is scaled by DPR
  const cssWidth = window.innerWidth;
  const cssHeight = window.innerHeight;

  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const scale = Math.min(cssWidth / img.width, cssHeight / img.height);
  const width = img.width * scale;
  const height = img.height * scale;
  const x = (cssWidth - width) / 2;
  const y = (cssHeight - height) / 2;

  ctx.drawImage(img, x, y, width, height);
}

images[0].onload = () => {
  resizeCanvas();
  drawFrame(0);
  positionHotspots();
};

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;

  const opacity = Math.max(0, 1 - scrollFraction * 5);
  heroText.style.opacity = opacity;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * (frameCount - 1)),
  );

  if (frameIndex >= 198) {
    hotspots.classList.add("active");
  } else {
    hotspots.classList.remove("active");
  }

  drawFrame(frameIndex);
  positionHotspots();
});

window.addEventListener("resize", () => {
  resizeCanvas();

  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * (frameCount - 1)),
  );

  drawFrame(frameIndex);
  positionHotspots();
});
