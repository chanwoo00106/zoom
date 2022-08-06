const socket = io();

const myFace = document.querySelector("#myFace");
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
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) option.selected = true;
      cameraSelect.append(option);
    });
  } catch (e) {}
}

async function getMedia(deviceId) {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: !deviceId && "user",
        deviceId: deviceId && { exact: deviceId },
      },
    });
    myFace.srcObject = myStream;
    await getCameras();
  } catch (e) {
    console.log(e);
  }
}

getMedia();

muteBtn.addEventListener("click", () => {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));

  muted = !muted;
  muteBtn.innerText = muted ? "Mute" : "Unmute";
});
cameraBtn.addEventListener("click", () => {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  cameraOff = !cameraOff;
  cameraBtn.innerText = cameraOff ? "Turn camera Off" : "Turn camera On";
});

cameraSelect.addEventListener("input", async () => {
  await getMedia(cameraSelect.value);
});
