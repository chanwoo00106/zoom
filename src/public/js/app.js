const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connect to Server");
});

socket.addEventListener("message", (message) => {
  console.log(`${message.data}`);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server X");
});

setTimeout(() => {
  socket.send("hello server");
}, 1000);
