// console.log("Welcome to spotify");

let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Hum Nashe Mein Toh Nahin",
    filePath: "1.mp3",
    coverPath: "1.jpg",
  },
  { songName: "Kesariya", filePath: "2.mp3", coverPath: "2.jpg" },
  { songName: "Kitni Haseen Hogi", filePath: "3.mp3", coverPath: "3.jpg" },
  {
    songName: "Mere Dholna (Arijit Version)",
    filePath: "4.mp3",
    coverPath: "4.jpg",
  },
  { songName: "Srivalli", filePath: "5.mp3", coverPath: "5.jpg" },
];

const numberOfSongs = Object.keys(songs).length;

songItems.forEach((element, i) => {
  // console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  // element.getElementsByClassName("timestamp")[0].innerText = new Audio(
  //   songs[i].filePath
  // ).duration;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-play");
      element.classList.remove("fa-pause");
    }
  );
};

masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    audioElement.play();
    gif.style.opacity = 1;
  } else {
    gif.style.opacity = 0;
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    audioElement.pause();
    makeAllPlays();
  }
});

// audioElement.play();
audioElement.addEventListener("timeupdate", () => {
  // console.log("timeupdate");
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  // console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (audioElement.paused) {
        // console.log(e.target);
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        gif.style.opacity = 1;
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        // console.log(e);
        audioElement.src = `${songIndex}.mp3`;
        audioElement.currentTime = 0;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        audioElement.play();
        document.getElementsByClassName("songItem")[
          `${songIndex - 1}`
        ].style.backgroundColor = "burlywood";
        document.getElementById("giftext").innerHTML =
          songs[`${songIndex - 1}`].songName;
      } else {
        // console.log(e.target);
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        gif.style.opacity = 1;
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = `${songIndex}.mp3`;
        audioElement.currentTime = 0;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        audioElement.play();
        for (let i = 0; i < numberOfSongs; i++) {
          document.getElementsByClassName("songItem")[
            `${i}`
          ].style.backgroundColor = "white";
        }
        document.getElementsByClassName("songItem")[
          `${songIndex - 1}`
        ].style.backgroundColor = "burlywood";

        document.getElementById("giftext").innerHTML =
          songs[`${songIndex - 1}`].songName;
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 5) {
    document.getElementById(`${songIndex}`).classList.remove("fa-pause");
    document.getElementById(`${songIndex}`).classList.add("fa-play");
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "white";
    songIndex = 1;
    document.getElementById(`${songIndex}`).classList.remove("fa-play");
    document.getElementById(`${songIndex}`).classList.add("fa-pause");
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "burlywood";
  } else {
    document.getElementsByClassName("songItem")[
      `${songIndex}`
    ].style.backgroundColor = "burlywood";
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "white";
    document.getElementById(`${songIndex}`).classList.remove("fa-pause");
    document.getElementById(`${songIndex}`).classList.add("fa-play");
    document.getElementById(`${songIndex + 1}`).classList.remove("fa-play");
    document.getElementById(`${songIndex + 1}`).classList.add("fa-pause");
    songIndex += 1;
  }
  audioElement.src = `${songIndex}.mp3`;
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  audioElement.play();
  document.getElementById("giftext").innerHTML =
    songs[`${songIndex - 1}`].songName;
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 1) {
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "white";
    document.getElementById(`${songIndex}`).classList.remove("fa-pause");
    document.getElementById(`${songIndex}`).classList.add("fa-play");
    songIndex = 5;
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "burlywood";
    document.getElementById(`${songIndex}`).classList.remove("fa-play");
    document.getElementById(`${songIndex}`).classList.add("fa-pause");
  } else {
    document.getElementsByClassName("songItem")[
      `${songIndex - 2}`
    ].style.backgroundColor = "burlywood";
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "white";
    document.getElementById(`${songIndex}`).classList.remove("fa-pause");
    document.getElementById(`${songIndex}`).classList.add("fa-play");
    document.getElementById(`${songIndex - 1}`).classList.remove("fa-play");
    document.getElementById(`${songIndex - 1}`).classList.add("fa-pause");
    songIndex -= 1;
  }
  audioElement.src = `${songIndex}.mp3`;
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  audioElement.play();
  document.getElementById("giftext").innerHTML =
    songs[`${songIndex - 1}`].songName;
});
