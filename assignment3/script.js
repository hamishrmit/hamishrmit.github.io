const frameCount = 200;

const canvas = document.getElementById("bikeCanvas");
const ctx = canvas.getContext("2d");
const heroText = document.getElementById("heroText");

// set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// converted frame number to filename
const currentFrame = (index) => {
  return `frames/${String(index).padStart(4, "0")}.png`;
};

// loaded all images
const images = [];

for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// drew out the frame
function drawFrame(index) {
  const img = images[index];

  if (!img.complete) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);

  const width = img.width * scale;
  const height = img.height * scale;

  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;

  ctx.drawImage(img, x, y, width, height);
}

// made it so first frame shows when loaded
images[0].onload = () => {
  drawFrame(0);
};

// animation for scroll controls
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

  drawFrame(frameIndex);
});

// this handles the window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const scrollTop = window.scrollY;

  const maxScroll = document.body.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * (frameCount - 1)),
  );

  drawFrame(frameIndex);
});
