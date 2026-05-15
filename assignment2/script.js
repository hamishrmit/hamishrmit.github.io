const video = document.querySelector("#custom-video-player");

const playPauseImg = document.querySelector("#play-pause-img");

const muteImg = document.querySelector("#mute-img");

const rewindBtn = document.querySelector("#rewind-btn");

const playPauseBtn = document.querySelector("#play-pause-btn");

const forwardBtn = document.querySelector("#forward-btn");

const muteBtn = document.querySelector("#mute-btn");

const fullscreenBtn = document.querySelector("#fullscreen-btn");

const progressBar = document.querySelector("#progress-bar-fill");

const progressContainer = document.querySelector("#progress-container");

const currentTimeDisplay = document.querySelector("#current-time");

const durationDisplay = document.querySelector("#duration");

const likeBtn = document.querySelector("#like-btn");

const playerGlow = document.querySelector("#player-glow");

const likeCount = document.querySelector("#like-count");

/* defined variables with ids from index file */

video.removeAttribute("controls");

/* browser default controls removed so the custom player design becomes the focus of the experience */

video.addEventListener("timeupdate", updateProgressBar);

video.addEventListener("timeupdate", updateTimeDisplay);

video.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(video.duration);
});

/* gets total video duration once media fully loads */

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();

    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  } else {
    video.pause();

    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  }
}

playPauseBtn.addEventListener("click", togglePlayPause);

/* play and pause button functionality */

rewindBtn.addEventListener("click", () => {
  video.currentTime -= 10;
});

forwardBtn.addEventListener("click", () => {
  video.currentTime += 10;
});

/* playback skipping functionality backwards and forwards 10 seconds */

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;

  if (video.muted) {
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  } else {
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
  }
});

/* mute video functionality */

fullscreenBtn.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
});

/* checks if fullscreen is supported by browser, fullscreen mode makes it a more cinematic viewing experience */

function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;

  progressBar.style.width = value + "%";
}

/* converts playback into percentage so that progress bar continuously reflects playback position */

progressContainer.addEventListener("click", (event) => {
  const progressWidth = progressContainer.clientWidth;

  const clickedX = event.offsetX;

  /* gets horizontal position of users click on timeline */

  const duration = video.duration;

  video.currentTime = (clickedX / progressWidth) * duration;
});

/* interactive skipping system, had to get chatgpt's and google's help to teach me for this one */

function updateTimeDisplay() {
  currentTimeDisplay.textContent = formatTime(video.currentTime);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);

  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

/* converts long decimal time values into readable minute/second format, needed googles/W3schools help for the logic here */

let glowStrength = 0;

let totalLikes = 0;

likeBtn.addEventListener("click", () => {
  totalLikes++;

  likeCount.textContent = totalLikes;

  glowStrength += 1;

  const purpleGlow = 35 + glowStrength * 18;

  const pinkGlow = 70 + glowStrength * 16;

  playerGlow.style.boxShadow = `
    0 0 ${purpleGlow}px rgba(140, 60, 255, 0.65),
    0 0 ${pinkGlow}px rgba(255, 46, 159, 0.45)
  `;

  /* main unique interaction feature is that when the user likes the video it increases the glow around the video player, which allows the user to interact with and add to the video art themselves. also had to get google and chatgpt to teach me for this one too */

  likeBtn.style.transform = "scale(1.15)";

  setTimeout(() => {
    likeBtn.style.transform = "scale(1)";
  }, 160);
});

/* simple pulse animation for when user clicks on like button */
