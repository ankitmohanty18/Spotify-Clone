// console.log("Welcome to spotify");

let songIndex = 1;
let audioElement = new Audio("assets/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

//Database containing the details of all the songs
let songs = [
  {
    songName: "Hum Nashe Mein Toh Nahin",
    filePath: "assets/1.mp3",
    coverPath: "assets/1.jpg",
    fileduration: "03:58",
    artistName: "Arijit Singh",
  },
  {
    songName: "Kesariya",
    filePath: "assets/2.mp3",
    coverPath: "assets/2.jpg",
    fileduration: "04:28",
    artistName: "Arijit Singh",
  },
  {
    songName: "Kitni Haseen Hogi",
    filePath: "assets/3.mp3",
    coverPath: "assets/3.jpg",
    fileduration: "05:30",
    artistName: "Arijit Singh",
  },
  {
    songName: "Mere Dholna (Arijit Version)",
    filePath: "assets/4.mp3",
    coverPath: "assets/4.jpg",
    fileduration: "06:04",
    artistName: "Arijit Singh",
  },
  {
    songName: "Srivalli",
    filePath: "assets/5.mp3",
    coverPath: "assets/5.jpg",
    fileduration: "03:44",
    artistName: "Javed Ali",
  },
  {
    songName: "Fitoor",
    filePath: "assets/6.mp3",
    coverPath: "assets/6.jpg",
    fileduration: "05:08",
    artistName: "Arijit Singh",
  },
  {
    songName: "Rasiya",
    filePath: "assets/7.mp3",
    coverPath: "assets/7.jpg",
    fileduration: "04:25",
    artistName: "Tushar Joshi",
  },
  {
    songName: "Tere Hawaale",
    filePath: "assets/8.mp3",
    coverPath: "assets/8.jpg",
    fileduration: "05:46",
    artistName: "Arijit Singh",
  },
  {
    songName: "Deva Deva",
    filePath: "assets/9.mp3",
    coverPath: "assets/9.jpg",
    fileduration: "04:39",
    artistName: "Arijit Singh",
  },
  {
    songName: "La Ilhaj",
    filePath: "assets/10.mp3",
    coverPath: "assets/10.jpg",
    fileduration: "02:03",
    artistName: "Arijit Singh",
  },
];

//Variable to store the total count of number of songs
const numberOfSongs = Object.keys(songs).length;

//To replace the psuedo text with actual song name from database
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("artistName")[0].innerText =
    songs[i].artistName;
});

//To update the time elapsed during playback in the sticky bar
function currentTimeGenerator() {
  const currentSongDuration = songs[`${songIndex - 1}`].fileduration;
  const timer = document.getElementById("durationzero");
  function currentTimeCounter() {
    var seconds = Math.round(audioElement.currentTime % 60);
    var minutes = Math.floor(audioElement.currentTime / 60);

    // console.log(currentSongDuration);

    if (seconds < 10) {
      timer.innerHTML = "0" + minutes + ":" + "0" + seconds;
    } else {
      timer.innerHTML = "0" + minutes + ":" + seconds;
      // console.log(timer.innerHTML);
      if (timer.innerHTML == currentSongDuration) {
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-circle-play");
        clearInterval(timeInterval);
      }
    }
  }
  let timeInterval = setInterval(currentTimeCounter, 1000);
}

const playit = () => {
  if (audioElement.paused) {
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-pause-circle");
    audioElement.play();
    currentTimeGenerator();
    gif.style.opacity = 1;
    // document.getElementsByClassName("container")[0].style.backgroundColor =
    //   "#5cf77b";
    document.getElementById("giftext").innerHTML =
      songs[`${songIndex - 1}`].songName;
  } else {
    gif.style.opacity = 0;
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-circle-play");
    audioElement.pause();
  }
};

const makeAllPlays = () => {
  document
    .getElementsByClassName("fa-pause-circle")
    .classList.add("fa-circle-play");
  document
    .getElementsByClassName("fa-pause-circle")
    .classList.remove("fa-pause-circle");
};

masterPlay.addEventListener("click", () => {
  playit();
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

myVolumeBar.addEventListener("change", () => {
  audioElement.volume = myVolumeBar.value / 100;
});

//Playback from click of cover image of songs
Array.from(document.getElementsByClassName("songimg")).forEach((element) => {
  element.addEventListener("click", (e) => {
    if (audioElement.paused) {
      songIndex = parseInt(e.target.id);
      console.log(e.target);
      gif.style.opacity = 1;
      iconindex = "i" + songIndex;
      el1 = document.getElementById(iconindex);
      el1.classList.remove("fa-circle-play");
      el1.classList.add("fa-pause-circle");
      audioElement.src = `assets/${songIndex}.mp3`;
      audioElement.currentTime = 0;
      playit();
      document.getElementsByClassName("songItem")[
        `${songIndex - 1}`
      ].style.backgroundColor = "rgb(58,58,58)";
      document.getElementById("duration-audio").innerHTML =
        songs[`${songIndex - 1}`].fileduration;
    } else {
      songIndex = parseInt(e.target.id);
      gif.style.opacity = 1;
      iconindex = "i" + songIndex;
      el1 = document.getElementById(iconindex);
      el1.classList.remove("fa-circle-play");
      el1.classList.add("fa-pause-circle");
      audioElement.src = `assets/${songIndex}.mp3`;
      audioElement.currentTime = 0;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-pause-circle");
      audioElement.play();
      for (let i = 0; i < numberOfSongs; i++) {
        document.getElementsByClassName("songItem")[
          `${i}`
        ].style.backgroundColor = "rgb(40,40,40)";
      }
      document.getElementsByClassName("songItem")[
        `${songIndex - 1}`
      ].style.backgroundColor = "rgb(58,58,58)";

      document.getElementById("giftext").innerHTML =
        songs[`${songIndex - 1}`].songName;
      document.getElementById("duration-audio").innerHTML =
        songs[`${songIndex - 1}`].fileduration;
    }
  });
});

//To make the on hover play button on image active
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (audioElement.paused) {
        thisID = e.target.id;
        songnumber = thisID.slice(1);
        songIndex = parseInt(songnumber);
        gif.style.opacity = 1;
        iconindex = "i" + songIndex;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `assets/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        playit();
        document.getElementsByClassName("songItem")[
          `${songIndex - 1}`
        ].style.backgroundColor = "rgb(58,58,58)";
        document.getElementById("duration-audio").innerHTML =
          songs[`${songIndex - 1}`].fileduration;
      } else {
        thisID = e.target.id;
        songnumber = thisID[1];
        songIndex = parseInt(songnumber);
        gif.style.opacity = 1;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `assets/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-pause-circle");
        audioElement.play();
        for (let i = 0; i < numberOfSongs; i++) {
          document.getElementsByClassName("songItem")[
            `${i}`
          ].style.backgroundColor = "rgb(40,40,40)";
        }
        document.getElementsByClassName("songItem")[
          `${songIndex - 1}`
        ].style.backgroundColor = "rgb(58,58,58)";

        document.getElementById("giftext").innerHTML =
          songs[`${songIndex - 1}`].songName;
        document.getElementById("duration-audio").innerHTML =
          songs[`${songIndex - 1}`].fileduration;
      }
    });
  }
);

/*NEXT BUTTON */

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= numberOfSongs) {
    document
      .getElementById(`i${songIndex}`)
      .classList.remove("fa-pause-circle");
    document.getElementById(`i${songIndex}`).classList.add("fa-circle-play");
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "rgb(40,40,40)";
    songIndex = 1;
    document.getElementById(`i${songIndex}`).classList.remove("fa-circle-play");
    document.getElementById(`i${songIndex}`).classList.add("fa-pause-circle");
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "rgb(58,58,58)";
    document.getElementById("duration-audio").innerHTML =
      songs[`${songIndex - 1}`].fileduration;
    gif.style.opacity = 1;
  } else {
    document.getElementsByClassName("songItem")[
      `${songIndex}`
    ].style.backgroundColor = "rgb(58,58,58)";
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "rgb(40,40,40)";

    document
      .getElementById(`i${songIndex}`)
      .classList.remove("fa-pause-circle");
    document.getElementById(`i${songIndex}`).classList.add("fa-circle-play");
    document
      .getElementById(`i${songIndex + 1}`)
      .classList.remove("fa-circle-play");
    document
      .getElementById(`i${songIndex + 1}`)
      .classList.add("fa-pause-circle");
    songIndex += 1;
    document.getElementById("duration-audio").innerHTML =
      songs[`${songIndex - 1}`].fileduration;
  }
  audioElement.src = `assets/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-pause-circle");
  audioElement.play();
  document.getElementById("giftext").innerHTML =
    songs[`${songIndex - 1}`].songName;
  gif.style.opacity = 1;
});

/*PREVIOUS BUTTON */

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 1) {
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "rgb(40,40,40)";
    document
      .getElementById(`i${songIndex}`)
      .classList.remove("fa-pause-circle");
    document.getElementById(`i${songIndex}`).classList.add("fa-circle-play");
    songIndex = numberOfSongs;
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "rgb(58,58,58)";
    document.getElementById(`i${songIndex}`).classList.remove("fa-circle-play");
    document.getElementById(`i${songIndex}`).classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    document.getElementsByClassName("songItem")[
      `${songIndex - 2}`
    ].style.backgroundColor = "rgb(58,58,58)";
    document.getElementsByClassName("songItem")[
      `${songIndex - 1}`
    ].style.backgroundColor = "rgb(40,40,40)";
    document
      .getElementById(`i${songIndex}`)
      .classList.remove("fa-pause-circle");
    document.getElementById(`i${songIndex}`).classList.add("fa-circle-play");
    document
      .getElementById(`i${songIndex - 1}`)
      .classList.remove("fa-circle-play");
    document
      .getElementById(`i${songIndex - 1}`)
      .classList.add("fa-pause-circle");
    songIndex -= 1;
  }
  audioElement.src = `assets/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-pause-circle");
  audioElement.play();
  document.getElementById("giftext").innerHTML =
    songs[`${songIndex - 1}`].songName;
  document.getElementById("duration-audio").innerHTML =
    songs[`${songIndex - 1}`].fileduration;
  gif.style.opacity = 1;
});

/* To open a new tab */
function popitup(url) {
  newwindow = window.open(
    url,
    "name",
    "height=300,width=650,screenX=400,screenY=350"
  );
  if (window.focus) {
    newwindow.focus();
  }
  return false;
}

function showerr() {
  prompt("This", "That");
}
