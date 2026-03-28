import { createIcons, icons } from "lucide";
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}
function getRandomBg() {
  const total = 10; // tổng số ảnh bạn có
  const randomIndex = Math.floor(Math.random() * total) + 1;
  return `/background/bg${randomIndex}.jpg`;
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
  let volumeBar = document.querySelector("#volume-bar");
  let progressBar = document.querySelector("#progress-bar");
  let currentTimeEl = document.querySelector("#current-time");
  // let songItemBtn = document.querySelector("song-item")
  let currentIndex = 0;

  let isRepeat = false;
  let songName = document.querySelector("#song-title");
  let thumbnailSong = document.querySelector(".thumbnail");
  let listSong = document.querySelector(".playlist");
  let muteBtn = document.querySelector("#mute-btn");
  console.log("controller");
  const images = require.context(
    "./background", // relative từ file hiện tại
    false,
    /\.(png|jpe?g|webp)$/,
  );
  const backgrounds = images.keys().map(images);
  const playlist = [
    {
      title: "Bad Habits",
      url: "song/Bad-Habits.mp3",
      avatar: "avatar/ni5.jpg",
      singer: "ed sheeran",
    },
    {
      title: "Die With A Smile",
      url: "song/Die-With-A-Smile.mp3",
      avatar: "avatar/ni2.jpg",
      singer: "bruno mars",
    },
    {
      title: "Memory",
      url: "song/memory_luutamvu-original.mp3",
      avatar: "avatar/ni3.jpg",
      singer: "lưu tâm vũ",
    },
    {
      title: "Memory",
      url: "song/memory_luutamvu-original.mp3",
      avatar: "avatar/ni4.jpg",
      singer: "lưu tâm vũ",
    },
    {
      title: "Memory",
      url: "song/memory_luutamvu-original.mp3",
      avatar: "avatar/ni5.jpg",
      singer: "lưu tâm vũ",
    },
    {
      title: "Memory",
      url: "song/memory_luutamvu-original.mp3",
      avatar: "avatar/ni6.jpg",
      singer: "lưu tâm vũ",
    },
  ];

  player.addEventListener("loadedmetadata", () => {
    console.log("loaded meta");
    player.volume = 0.2;
    duration.innerHTML = formatTime(player.duration);
  });
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
      .map(
        (song, index) =>
          `
    <li class="song-item ${index === 0 ? "active" : ""}">
      <div class="song-thumb">
        <img src="${song.avatar}" >
      </div>
      <div class="song-body">
        <h3 class="title">${song.title}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="song-option">
        <i data-lucide="more-horizontal"></i>
      </div>
    </li>
  `,
      )
      .join("");
    //duration song
    player.addEventListener("loadedmetadata", () => {
      duration.innerHTML = formatTime(player.duration);
      songTitle.innerHTML = `Now playing: ${infoSong.title}`;
      thumbnailSong.src = infoSong.avatar;
    });
    console.log(thumbnailSong);
    console.log(infoSong);

    return songName;
  }

  function loadSongAndPlay(song) {
    loadSongInfo(currentIndex);
    onCanPlayThrough();
    return song;
  }

  function togglePlayPauseBtn() {
    console.log("before play song");
    if (player.paused) {
      player
        .play()
        .then(() => {
          console.log("song playing");
          playPauseIcons.innerHTML = '<i data-lucide="pause"></i>';
          thumbnailSong.classList.add("playing");
          createIcons({ icons });
        })
        .catch((err) => console.error("Play error:", err));
    } else {
      player.pause();
      playPauseIcons.innerHTML = '<i data-lucide="play"></i>';
      thumbnailSong.classList.remove("playing");
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
    changeBackgroundRandom();
    // songItem();
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

  function songItem(){
    console.dir(songItemBtn);
  }
  // -------------------change background------------------
  let index = 0;
  function changeBackgroundRandom() {
    console.log(backgrounds);
    index++;
    if (index >= backgrounds.length) index = 0;
    const bg = backgrounds[index];
    document.body.style.backgroundImage = `url('${bg}')`;
  }

  /*---------control volume and media duration---------*/
  player.addEventListener("ended", () => {
    if (isRepeat) {
      player.play();
    } else {
      nextSongBtn();
    }
  });
  volumeBar.addEventListener("input", () => {
    player.volume = volumeBar.value;
    console.log(player.volume);
    console.log(player.progress);
  });
  /*---------update progress time song---------*/

  player.addEventListener("timeupdate", () => {
    const progress = (player.currentTime / player.duration) * 100;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(player.currentTime);
  });

  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * player.duration;
    player.currentTime = seekTime;
  });

  muteBtn.addEventListener("click", (e) => {
    // Ngăn sự kiện click bị trôi ra ngoài
    e.stopPropagation();
    // Thêm hoặc xóa class 'active' để hiện/ẩn thanh volume
    volumeBar.classList.toggle("active");
  });
  muteBtn.addEventListener("click", (e) => {});
  // Khi click ra bất kỳ đâu ngoài vùng volume, ẩn thanh volume đi cho gọn
  document.addEventListener("click", (e) => {
    if (!volumeBar.contains(e.target)) {
      volumeBar.classList.remove("active");
    }
  });

  // song title effect
  player.onplay = () => {
    songTitle.classList.add("playing-effect");
  };

  player.onpause = () => {
    songTitle.classList.remove("playing-effect");
  };

  document.addEventListener("click", (e) => {});
  playBtn.addEventListener("click", togglePlayPauseBtn);
  nextBtn.addEventListener("click", nextSongBtn);
  prevBtn.addEventListener("click", prevSongBtn);
  // songItemBtn.addEventListener("click",console.log("hello"))
  loadSongInfo(0);
  changeBackgroundRandom();
}
