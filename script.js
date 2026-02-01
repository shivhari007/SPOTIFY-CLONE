// AUTH CHECK
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songitem"));

// ================= SONG DATA =================
let songs = [
  {
    songName: "Salam-e-Ishq",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  { songName: "Wariyo", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Deaf Kev", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  {
    songName: "Janji-Heroes",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  { songName: "Sakiyaan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  {
    songName: "Bhula dena",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Tumhari kasam",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  { songName: "Tum hi Ho", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Rabba", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  {
    songName: "Extra Song",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// ================= POPULATE SONG LIST =================
songItems.forEach((element, i) => {
  if (!songs[i]) return;

  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.querySelector(".songItemPlay").id = i;
});

// ================= HELPERS =================
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((el) => {
    el.src = "covers/play-button.png";
  });
};

const playSong = () => {
  makeAllPlays();
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.src = "covers/pause-button.png";
  document.getElementById(songIndex).src = "covers/pause-button.png";
  gif.style.opacity = 1;
};

const pauseSong = () => {
  audioElement.pause();
  masterPlay.src = "covers/play-button.png";
  document.getElementById(songIndex).src = "covers/play-button.png";
  gif.style.opacity = 0;
};

// ================= MASTER PLAY =================
masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// ================= SONG ITEM PLAY =================
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      let clickedIndex = parseInt(e.target.id);

      if (songIndex === clickedIndex && !audioElement.paused) {
        pauseSong();
      } else {
        songIndex = clickedIndex;
        playSong();
      }
    });
  },
);

// ================= PROGRESS BAR =================
audioElement.addEventListener("timeupdate", () => {
  if (!isNaN(audioElement.duration)) {
    myProgressBar.value = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100,
    );
  }
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// ================= NEXT =================
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong();
});

// ================= PREVIOUS =================
document.getElementById("previous").addEventListener("click", () => {
  songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
  playSong();
});

// ================= AUTO NEXT ON END =================
audioElement.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong();
});


