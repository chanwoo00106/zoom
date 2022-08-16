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
let myPeerConnection;

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

const initCall = async () => {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();

  makeConnection();
};

welcome.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = welcome.querySelector("form input");
  await initCall();
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
});

// socket.io

socket.on("welcome", async () => {
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("send the offer");
  socket.emit("offer", offer, roomName);
});

socket.on("offer", async (offer) => {
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  socket.emit("answer", answer, roomName);
});

socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

// RTC Code

const makeConnection = () => {
  myPeerConnection = new RTCPeerConnection();
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
};
