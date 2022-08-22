const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.querySelector("#mute");
const cameraBtn = document.querySelector("#camera");
const cameraSelect = document.querySelector("#cameras");

let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameraSelect.innerHTML = "";
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.innerText = camera.label;
      option.value = camera.deviceId;
      option.selected = currentCamera.label === camera.label;
      cameraSelect.appendChild(option);
    });
    const option = document.createElement("option");
    option.innerText = "hi";
    option.value = "hello";
    cameraSelect.appendChild(option);
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstraints = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraints
    );
    myFace.srcObject = myStream;

    if (!deviceId) await getCameras();
  } catch (e) {}
}

getMedia();

muteBtn.addEventListener("click", () => {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));

  if (muted) muteBtn.innerText = "Mute";
  else muteBtn.innerText = "UnMute";
  muted = !muted;
});
cameraBtn.addEventListener("click", () => {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));

  if (cameraOff) cameraBtn.innerText = "Turn Camera On";
  else cameraBtn.innerHTML = "Turn Camera Off";
  cameraOff = !cameraOff;
});

cameraSelect.addEventListener("input", () => {
  getMedia(cameraSelect.value);
});
