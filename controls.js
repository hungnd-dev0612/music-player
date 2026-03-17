export function initControls() {
  const playBtn = document.querySelector(".play");
  playBtn.addEventListener("click", () => {
    console.log("Play clicked");
  });
}