const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.querySelector("#mute");
const cameraBtn = document.querySelector("#camera");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myFace.srcObject = myStream;
  } catch (e) {}
}

getMedia();

muteBtn.addEventListener("click", () => {
  if (muted) muteBtn.innerText = "Mute";
  else muteBtn.innerText = "UnMute";
  muted = !muted;
});
cameraBtn.addEventListener("click", () => {
  if (cameraOff) cameraBtn.innerText = "Turn Camera On";
  else cameraBtn.innerHTML = "Turn Camera Off";
  cameraOff = !cameraOff;
});
