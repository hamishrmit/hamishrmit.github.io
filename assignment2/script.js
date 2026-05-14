const video = document.querySelector("#custom-video-player");

const playPauseImg = document.querySelector("#play-pause-img");

const muteImg = document.querySelector("#mute-img");

const rewindBtn = document.querySelector("#rewind-btn");

const forwardBtn = document.querySelector("#forward-btn");

const muteBtn = document.querySelector("#mute-btn");

const fullscreenBtn = document.querySelector("#fullscreen-btn");

const progressBar = document.querySelector("#progress-bar-fill");

const progressContainer = document.querySelector("#progress-container");

const currentTimeDisplay = document.querySelector("#current-time");

const durationDisplay = document.querySelector("#duration");

const ambientLight = document.querySelector(".ambient-light");

const likeBtn = document.querySelector("#like-btn");

const playerGlow = document.querySelector("#player-glow");

const likeCount = document.querySelector("#like-count");

/*
  Browser default controls removed so
  the custom player design becomes
  the focus of the experience.
*/

video.removeAttribute("controls");

video.addEventListener("timeupdate", updateProgressBar);

video.addEventListener("timeupdate", updateTimeDisplay);

video.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(video.duration);
});

/*
  Ambient glow appears during playback
  to make the video feel more immersive.
*/

video.addEventListener("play", () => {
  ambientLight.style.opacity = "1";
});

video.addEventListener("pause", () => {
  ambientLight.style.opacity = "0";
});

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();

    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  } else {
    video.pause();

    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  }
}

/*
  Playback skipping functionality.
*/

rewindBtn.addEventListener("click", () => {
  video.currentTime -= 10;
});

forwardBtn.addEventListener("click", () => {
  video.currentTime += 10;
});

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;

  if (video.muted) {
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  } else {
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
  }
});

/*
  Fullscreen mode supports a more
  cinematic viewing experience.
*/

fullscreenBtn.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
});

/*
  Progress bar continuously reflects
  playback position.
*/

function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;

  progressBar.style.width = value + "%";
}

/*
  Interactive scrubbing system.
*/

progressContainer.addEventListener("click", (event) => {
  const progressWidth = progressContainer.clientWidth;

  const clickedX = event.offsetX;

  const duration = video.duration;

  video.currentTime = (clickedX / progressWidth) * duration;
});

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

/*
  Main interaction feature:
  repeated likes increase glow intensity
  around the video player.
*/

let glowStrength = 0;

let totalLikes = 0;

likeBtn.addEventListener("click", () => {
  totalLikes++;

  likeCount.textContent = totalLikes;

  /*
    Glow now increases more noticeably.
  */

  glowStrength += 1;

  const purpleGlow = 35 + glowStrength * 18;

  const pinkGlow = 70 + glowStrength * 16;

  playerGlow.style.boxShadow = `
    0 0 ${purpleGlow}px rgba(140, 60, 255, 0.65),
    0 0 ${pinkGlow}px rgba(255, 46, 159, 0.45)
  `;

  /*
    Simple pulse animation.
    Easier and more realistic
    for a class assignment scope.
  */

  likeBtn.style.transform = "scale(1.15)";

  setTimeout(() => {
    likeBtn.style.transform = "scale(1)";
  }, 160);
});
