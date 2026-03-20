import { createIcons, icons } from "lucide";
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function initControls() {
  let player = document.querySelector("#player");
  const playBtn = document.querySelector("#play-pause-btn");
  const nextBtn = document.querySelector("#next-btn");
  const prevBtn = document.querySelector("#prev-btn");
  const randomBtn = document.querySelector("#random-btn");
  let playPauseIcons = document.querySelector("#play-pause-btn");
  let duration = document.querySelector("#duration");
  let songTitle = document.querySelector("#song-title");

  let currentIndex = 0;

  let isRepeat = false;
  let songName = document.querySelector("#song-title");
  let thumbnailSong = document.querySelector(".thumbnail");
  let listSong = document.querySelector(".playlist");
  console.log("controller");

  const playlist = [
    {
      title: "Bad Habits",
      url: "song/Bad-Habits.mp3",
      avatar: "avatar/bad-habit-thumbnail.jpeg",
      singer: "ed sheeran",
    },
    {
      title: "Die With A Smile",
      url: "song/Die-With-A-Smile.mp3",
      avatar: "example.jpg",
      singer: "bruno mars",
    },
    {
      title: "Memory",
      url: "song/memory_luutamvu-original.mp3",
      avatar: "example.jpg",
      singer: "lưu tâm vũ",
    },
  ];

  function onLoadedMetaData() {
    console.log("loaded meta");
    player.onloadedmetadata = (event) => {
      console.log(event);
    };
  }

  function onCanPlayThrough() {
    player.oncanplaythrough = () => {
      player.play();
      player.oncanplaythrough = null;
    };
    return player.oncanplaythrough;
  }

  function loadSongInfo(index = 0) {
    currentIndex = index;
    let infoSong = playlist[index];
    playPauseIcons.innerHTML = '<i data-lucide="play"></i>';
    createIcons({ icons });
    console.log(playPauseIcons);
    player.src = infoSong.url;
    listSong.innerHTML = playlist
      .map((song) => `<li>${song.title} - ${song.singer}</li>`)
      .join("");
    //duration song
    player.onloadedmetadata = () => {
      duration.innerHTML = formatTime(player.duration);
      songTitle.innerHTML = infoSong.title;
      thumbnailSong.src = infoSong.avatar;
    };
    console.log(thumbnailSong);
    console.log(infoSong);
    
    return songName;
  }

  function loadSongAndPlay(song) {
    loadSongInfo(currentIndex);
    onLoadedMetaData();
    onCanPlayThrough();
    return song;
  }

  function togglePlayPauseBtn() {
    onLoadedMetaData();
    console.log("before play song");
    if (player.paused) {
      player
        .play()
        .then(() => {
          console.log("song playing");
          playPauseIcons.innerHTML = '<i data-lucide="pause"></i>';
          thumbnailSong.classList.remove("paused");
          createIcons({ icons });
        })
        .catch((err) => console.error("Play error:", err));
    } else {
      player.pause();
      playPauseIcons.innerHTML = '<i data-lucide="play"></i>';
      thumbnailSong.classList.add("paused");
      createIcons({ icons });
    }
  }

  function nextSongBtn() {
    console.log("nextSong button call");
    if (currentIndex >= playlist.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    loadSongAndPlay(currentIndex);
  }
  function prevSongBtn() {
    if (currentIndex == 0) {
      console.log("is the first song of the list u mdfk");
      return currentIndex;
    }
    if (currentIndex >= playlist.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex--;
    }
    loadSongAndPlay(currentIndex);
  }
  /*---------control volume and media duration---------*/

  player.addEventListener("ended", () => {
    if (isRepeat) {
      player.play();
    } else {
      nextSongBtn();
    }
  });
  playBtn.addEventListener("click", togglePlayPauseBtn);
  nextBtn.addEventListener("click", nextSongBtn);
  prevBtn.addEventListener("click", prevSongBtn);
  loadSongInfo(0);
}
