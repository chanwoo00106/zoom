const msgList = document.querySelector("ul"),
  msgForm = document.querySelector("form");

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

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = msgForm.querySelector("input");

  socket.send(input.value);
  input.value = "";
});
