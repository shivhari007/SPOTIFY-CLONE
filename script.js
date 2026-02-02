// 1. AUTH CHECK (Runs immediately)
const path = window.location.pathname;
const page = path.split("/").pop();
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// If not logged in and not on the login page, redirect
if (page !== "login.html" && page !== "" && !isLoggedIn) {
  window.location.replace("./login.html");
}

// 2. GLOBAL VARIABLES & DATA
let songIndex = 0;
let audioElement = new Audio();
let songs = [
  {
    songName: "Salam-e-Ishq",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010692/1_h6xwco.mp3",
    coverPath: "img/1.jpg",
  },
  {
    songName: "Wariyo",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010715/4_nws53r.mp3",
    coverPath: "img/2.jpg",
  },
  {
    songName: "Deaf Kev",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010692/2_dtnufu.mp3",
    coverPath: "img/3.jpg",
  },
  {
    songName: "Janji-Heroes",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010695/5_m7bxhw.mp3",
    coverPath: "img/4.jpg",
  },
  {
    songName: "Sakiyaan",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010696/9_jpsmoo.mp3",
    coverPath: "img/5.jpg",
  },
  {
    songName: "Bhula dena",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010696/7_pdkbfe.mp3",
    coverPath: "img/6.jpg",
  },
  {
    songName: "Tumhari kasam",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010699/10_vgj0ru.mp3",
    coverPath: "img/7.jpg",
  },
  {
    songName: "Tum hi Ho",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010699/3_ek5rrq.mp3",
    coverPath: "img/8.jpg",
  },
  {
    songName: "Rabba",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010704/8_wlddkg.mp3",
    coverPath: "img/9.jpg",
  },
  {
    songName: "Extra Song",
    filePath:
      "https://res.cloudinary.com/djcdyt7zl/video/upload/v1770010708/6_cbo3se.mp3",
    coverPath: "img/10.jpg",
  },
];

// 3. WAIT FOR DOM TO BE READY
window.addEventListener("DOMContentLoaded", () => {
  // Define UI elements
  const masterPlay = document.getElementById("masterPlay");
  const myProgressBar = document.getElementById("myProgressBar");
  const gif = document.getElementById("gif");
  const songItems = Array.from(document.getElementsByClassName("songitem"));

  // ================= HELPERS =================
  const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(
      (el) => {
        el.src = "img/play-button.png";
      },
    );
  };

  const playSong = () => {
    makeAllPlays();
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.src = "img/pause-button.png";
    // Update the specific icon in the list
    const currentListItemPlay = document.getElementById(songIndex);
    if (currentListItemPlay) currentListItemPlay.src = "img/pause-button.png";
    gif.style.opacity = 1;
  };

  const pauseSong = () => {
    audioElement.pause();
    masterPlay.src = "img/play-button.png";
    const currentListItemPlay = document.getElementById(songIndex);
    if (currentListItemPlay) currentListItemPlay.src = "img/play-button.png";
    gif.style.opacity = 0;
  };

  // ================= INITIALIZE UI =================
  songItems.forEach((element, i) => {
    if (!songs[i]) return;
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.querySelector(".songItemPlay").id = i;
  });

  // ================= EVENT LISTENERS =================
  masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      playSong();
    } else {
      pauseSong();
    }
  });

  // Song Item Clicks
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

  // Progress Bar
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

  // Next Button
  document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
  });

  // Previous Button
  document.getElementById("previous").addEventListener("click", () => {
    songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
    playSong();
  });

  // Auto-Next
  audioElement.addEventListener("ended", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
  });
});
