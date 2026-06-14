// total number of frames extracted from the disassembly video
const frameCount = 200;

const canvas = document.getElementById("bikeCanvas");
const ctx = canvas.getContext("2d");
const heroText = document.getElementById("heroText");
const hotspots = document.getElementById("hotspots");
const hoverHint = document.getElementById("hoverHint");

// sets browser zoom
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

// positions each hotspot div over its matching part in frame 200
function positionHotspots() {
  const frameWidth = 1280;
  const frameHeight = 720;

  const rect = canvas.getBoundingClientRect();
  const cssWidth = rect.width;
  const cssHeight = rect.height;

  // scale maintains aspect ratio, the smaller axis is the limiting factor
  const scale = Math.min(cssWidth / frameWidth, cssHeight / frameHeight);

  const renderedWidth = frameWidth * scale;
  const renderedHeight = frameHeight * scale;

  // I centred the frame within the canvas
  const offsetX = (cssWidth - renderedWidth) / 2;
  const offsetY = (cssHeight - renderedHeight) / 2;

  // x, y, width, height measured manually from frame 200 so that the hotspot parts are located precisely
  placePart("mainframe", 164, 97, 678, 410);
  placePart("engine", 551, 342, 181, 207);
  placePart("exhaust", 286, 462, 444, 128);
  placePart("fuel", 501, 89, 278, 132);
  placePart("cowling", 839, 28, 336, 346);
  placePart("suspension", 841, 345, 148, 236);

  // chose to make cowling label flipped to appear below instead of above (had some issues with the label text appearing underneath other parts)
  document.getElementById("cowling").classList.add("label-below");

  // converts frame-space coordinates to screen-space pixels. basically everything from here on required a lot of research and help from Google/ChatGPT as I was very unfamiliar with how to go about doing things
  function placePart(id, x, y, width, height) {
    const part = document.getElementById(id);
    part.style.left = `${offsetX + x * scale}px`;
    part.style.top = `${offsetY + y * scale}px`;
    part.style.width = `${width * scale}px`;
    part.style.height = `${height * scale}px`;
  }
}

// builds the filename for each frame e.g. frames/0042.png
const currentFrame = (index) => `frames/${String(index).padStart(4, "0")}.png`;

// preloads all frames so scrolling plays back without loading delays
const images = [];
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// draws a single frame centred and letterboxed on the canvas
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

// this maps the scroll wheel position to a frame index between 0 and 199
function getCurrentFrameIndex() {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;
  return Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * (frameCount - 1)),
  );
}

// returns accurate dimensions
images[0].onload = () => {
  requestAnimationFrame(() => {
    resizeCanvas();
    drawFrame(0);
    positionHotspots();
  });
};

// event listener for the scroll wheel
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;

  // fades the hero text out in the first 20% of the scroll
  heroText.style.opacity = Math.max(0, 1 - scrollFraction * 5);

  const frameIndex = getCurrentFrameIndex();

  // hotspots and hint text revealed only once the disassembly is nearly complete
  hotspots.classList.toggle("active", frameIndex >= 198);
  hoverHint.classList.toggle("active", frameIndex >= 198);

  drawFrame(frameIndex);
  positionHotspots();
});

// re-syncs canvas size and redraws when the window is resized
window.addEventListener("resize", () => {
  resizeCanvas();
  drawFrame(getCurrentFrameIndex());
  positionHotspots();
});

// pageshow fires after Chrome fully paints the page, catching cases (had to do this as I ran into an issue where the hotspot parts would misalign on different screen sizes)
window.addEventListener("pageshow", () => {
  requestAnimationFrame(() => {
    resizeCanvas();
    drawFrame(getCurrentFrameIndex());
    positionHotspots();
  });
});

// future benefit: if expanded into a full website, this interaction could serve as the landing page of a Motorbike company (such as Yamaha) that transitions naturally into product pages for each part
