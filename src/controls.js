import { createIcons, icons } from "lucide";
export function initControls() {
  const playBtn = document.querySelector("#play-pause-btn");
  const nextBtn = document.querySelector("#next-btn");
  const prevBtn = document.querySelector("#prev-btn");
  const randomBtn = document.querySelector("#random-btn");
  let playPauseIcons = document.querySelector("#play-pause-btn");
  let source = document.querySelector("source");
  let currentIndex = 0;
  let player = document.querySelector("#player");
  let isRepeat = false;
  let songName = document.querySelector("#song-title");
  let avatarDom = document.querySelector(".avatar");
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

  player.onloadedmetadata = () => {
    player.volume = 0.5;
  };

  function loadSongInfo(infoSong) {
    console.log(avatarDom);
    console.log(infoSong);
    avatarDom.innerHTML = `${infoSong.title}`;
    avatarDom.src = infoSong.avatar;
    return songName;
  }

  function loadSong(index = 0) {
    currentIndex = index;
    let song = playlist[index];
    source.src = song.url;
    playPauseIcons.innerHTML = '<i data-lucide="pause"></i>';
    loadSongInfo(song);
    createIcons({ icons });
    return index;
  }

  function togglePlayPauseBtn() {
    if (player.paused) {
      player.play()
        .then(() => {
          playPauseIcons.innerHTML = '<i data-lucide="pause"></i>';
          avatarDom.classList.remove("paused");
          createIcons({ icons });
        })
        .catch(err => console.error("Play error:", err));
    } else {
      player.pause();
      playPauseIcons.innerHTML = '<i data-lucide="play"></i>';
      avatarDom.classList.add("paused");
      createIcons({ icons });
    }
  }

  function nextSongBtn() {
    if (currentIndex >= playlist.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    loadSong(currentIndex);
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
    loadSong(currentIndex);
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
  // nextBtn.addEventListener("click", nextSongBtn);
  // prevBtn.addEventListener("click", prevSongBtn);
  // loadSong();
}
