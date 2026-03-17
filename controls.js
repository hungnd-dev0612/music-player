// import { lucide } from "lucide";
export function initControls() {
  const playBtn = document.querySelector("#play-pause-btn");
  const nextBtn = document.querySelector("#next-btn");
  const prevBtn = document.querySelector("#prev-pause-btn");
  const randomBtn = document.querySelector("#random-btn");
  let player = document.querySelector("#player");
  const playlist = [
    { title: "Bad Habits", url: "song/Bad-Habits.mp3", avatar: "example.jpg" },
    {
      title: "Song 2",
      url: "song/Die-With-A-Smile.mp3",
      avatar: "example.jpg",
    },
    {
      title: "Song 3",
      url: "song/memory_luutamvu-original.mp3",
      avatar: "example.jpg",
    },
  ];
  function loadSong(index = 0) {
    let source = document.querySelector("source");
    let song = playlist[index];
    source.src = song.url;
  }
  function togglePlayPauseBtn() {
    let playPauseIcons = document.querySelector("#play-pause-btn");
    if (player.paused) {
      player.play();
      playPauseIcons.innerHTML = '<i data-lucide="pause"></i>';
    } else {
      player.pause();
      playPauseIcons.innerHTML = '<i data-lucide="play"></i>';
    }
    lucide.createIcons();
    console.log(icon);
  }
  function nextSongBtn() {
    let playPauseIcons = document.querySelector("#play-pause-btn");
    if (player.paused) {
      player.play();
      playPauseIcons.innerHTML = '<i data-lucide="pause"></i>';
    } else {
      player.pause();
      playPauseIcons.innerHTML = '<i data-lucide="play"></i>';
    }
    lucide.createIcons();
    console.log(icon);
  }
  // function prevBtn() {
  //   let playPauseIcons = document.querySelector("#play-pause-btn");
  //   if (player.paused) {
  //     player.play();
  //     playPauseIcons.innerHTML = '<i data-lucide="pause"></i>';
  //   } else {
  //     player.pause();
  //     playPauseIcons.innerHTML = '<i data-lucide="play"></i>';
  //   }
  //   lucide.createIcons();
  //   console.log(icon);
  // }
  playBtn.addEventListener("click", togglePlayPauseBtn);
  loadSong(2);
}
