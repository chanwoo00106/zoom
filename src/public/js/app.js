const socket = io();

const myFace = document.querySelector("#myFace");
const muteBtn = document.querySelector("#mute");
const camerraBtn = document.querySelector("#camerra");

let myStream;
let muted = false;
let camerraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: muted,
      video: camerraOff,
    });
    myFace.srcObject = myStream;
  } catch (e) {
    console.log(e);
  }
}

getMedia();

muteBtn.addEventListener("click", () => {
  muted = !muted;
  muteBtn.innerText = muted ? "Mute" : "Unmute";
  getMedia();
});
camerraBtn.addEventListener("click", () => {
  camerraOff = !camerraOff;
  camerraBtn.innerText = camerraOff ? "Turn Camerra Off" : "Turn Camerra On";
  getMedia();
});
