const socket = io();

const myFace = document.querySelector("#myFace");
const muteBtn = document.querySelector("#mute");
const cameraBtn = document.querySelector("#camera");
const cameraSelect = document.querySelector("#cameras");

const call = document.querySelector("#call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;

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

// welcome
const welcome = document.querySelector("#welcome");

const startMedia = () => {
  welcome.hidden = true;
  call.hidden = false;
  getMedia();
};

welcome.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = welcome.querySelector("form input");
  socket.emit("join_room", input.value, startMedia);
  roomName = input.value;
  input.value = "";
});

// socket.io

socket.on("welcome", () => {
  console.log("someone joined");
});
