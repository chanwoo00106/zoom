let localStream;
let remoteStream;
let peerConnection;

const servers = {
  iceServers: [
    {
      urls: [],
    },
  ],
};

const init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  document.getElementById("user-1").srcObject = localStream;

  createOffer();
};

const createOffer = async () => {
  peerConnection = new RTCPeerConnection();

  remoteStream = new MediaStream();
  document.querySelector("#user-2").srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack();
    });
  };

  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      console.log("New ICE cadidate", event.candidate);
    }
  };

  let offer = await peerConnection.createOffer;
  await peerConnection.setLocalDescription(offer);

  console.log("offer : ", offer);
};

init();
