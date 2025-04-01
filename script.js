import { all } from "./tools/data.js";
let currentIndex = Math.floor(Math.random() * 8); //POur générer un nombre aléatoire compris entre 0 et 7
let isPlaying = false;
let inShuffle = false;
let audioToPlay;
function loadAudio(currentIndex) {
  let cover = all[currentIndex].cover;
  let artist = all[currentIndex].artist;
  let title = all[currentIndex].title;
  let audio = all[currentIndex].audio;
  audioToPlay = new Audio(audio);
  document.getElementById("cover").setAttribute("src", cover);
  document.getElementById("audio").setAttribute("src", audio);
  document.getElementById("title").innerText = `${title}`;
  document.getElementById("artist").innerText = `${artist}`;
}
loadAudio(currentIndex);
let prev = document.getElementById("prev");
let play = document.getElementById("play");
let next = document.getElementById("next");
let increase = document.getElementById("increase");
let decrease = document.getElementById("decrease");
let mute = document.getElementById("mute");
let loop = document.getElementById("loop");
let shuffle = document.getElementById("shuffle");
let currentTime = document.getElementById("current-time");
let duration = document.getElementById("duration");

//Gestion du clic sur le bouton prev
prev.addEventListener("click", () => {
  audioToPlay.pause();
  if (inShuffle == true) {
    currentIndex = Math.floor(Math.random() * 8);
  } else {
    currentIndex == 0 ? (currentIndex = 7) : currentIndex--;
  }
  loadAudio(currentIndex);
  isPlaying = true;
  play.innerHTML = `<i class="fas fa-pause">`;
  audioToPlay.play();
});
//FIN

//Gestion du clic sur le bouton play
play.addEventListener("click", () => {
  if (isPlaying) {
    isPlaying = false;
    audioToPlay.pause();
    play.innerHTML = `<i class="fas fa-play">`;
  } else {
    isPlaying = true;
    play.innerHTML = `<i class="fas fa-pause">`;
    audioToPlay.play();
  }
});
//FIN

//Gestion du clic sur le bouton next
next.addEventListener("click", () => {
  audioToPlay.pause();
  if (inShuffle == true) {
    currentIndex = Math.floor(Math.random() * 8);
  } else {
    currentIndex == 7 ? (currentIndex = 0) : currentIndex++;
  }
  loadAudio(currentIndex);
  isPlaying = true;
  play.innerHTML = `<i class="fas fa-pause">`;
  audioToPlay.play();
});
//FIN

//Gestion du clic sur le bouton increase
increase.addEventListener("click", () => {
  if (audioToPlay.volume < 1.0) {
    audioToPlay.volume = Math.min(audioToPlay.volume + 0.1, 1.0);
  }
  if (audioToPlay.volume === 1.0) {
    increase.style.color = "gray";
    increase.disabled = true;
  } else {
    increase.style.color = "#333";
    increase.disabled = false;
  }
  if (audioToPlay.volume > 0.0) {
    decrease.style.color = "#333";
    decrease.disabled = false;
  }
});
//FIN

//Gestion du clic sur le bouton decrease
decrease.addEventListener("click", () => {
  if (audioToPlay.volume > 0.0) {
    audioToPlay.volume = Math.max(audioToPlay.volume - 0.1, 0.0);
  }
  if (audioToPlay.volume === 0.0) {
    decrease.style.color = "gray";
    decrease.disabled = true;
  } else {
    decrease.style.color = "#333";
    decrease.disabled = false;
  }
  if (audioToPlay.volume < 1.0) {
    increase.style.color = "#333";
    increase.disabled = false;
  }
});
//FIN

//Gestion du clic sur le bouton mute
mute.addEventListener("click", () => {
  if (audioToPlay.muted == true) {
    audioToPlay.muted = false;
    mute.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  } else {
    audioToPlay.muted = true;
    mute.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  }
});
//FIN

//Gestion du clic sur le bouton loop
loop.addEventListener("click", () => {
  if (audioToPlay.loop == false) {
    audioToPlay.loop = true;
    loop.style.color = "#af4261";
  } else {
    audioToPlay.loop = false;
    loop.style.color = "#333";
  }
});
//FIN

//Gestion du clic sur le bouton shuffle
shuffle.addEventListener("click", () => {
  if (inShuffle == false) {
    inShuffle = true;
    shuffle.style.color = "#af4261";
  } else {
    inShuffle = false;
    shuffle.style.color = "#333";
  }
});
//FIN

audioToPlay.addEventListener("ended", () => {
  if (audioToPlay.loop == true) {
    loadAudio(currentIndex);
    audioToPlay.play();
  } else {
    if (inShuffle == true) {
      currentIndex = Math.floor(Math.random() * 8);
      loadAudio(currentIndex);
      audioToPlay.play();
    } else {
      currentIndex++;
      loadAudio(currentIndex);
      audioToPlay.play();
    }
  }
});
function convert(val) {
  if (isNaN(val) || val < 0) {
    return "00:00"; 
  }
  let min = Math.floor(val / 60);
  let sec = Math.floor(val % 60);
  sec = sec < 10 ? "0" + sec : sec;
  return `${min}:${sec}`;
}

audioToPlay.addEventListener("timeupdate", () => {
  currentTime.innerText = convert(audioToPlay.currentTime);
  duration.innerText = convert(audioToPlay.duration);
});
