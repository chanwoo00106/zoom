const msgList = document.querySelector("ul"),
  msgForm = document.querySelector("#message"),
  nickForm = document.querySelector("#nick");

const socket = new WebSocket(`ws://${window.location.host}`);

const makeMsg = (type, payload) => JSON.stringify({ type, payload });

socket.addEventListener("open", () => {
  console.log("Connect to Server");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  msgList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server X");
});

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = msgForm.querySelector("input");

  socket.send(makeMsg("message", input.value));
  input.value = "";
});

nickForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMsg("nickname", input.value));
  input.value = "";
});
