const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

const room = document.querySelector("#room");
room.hidden = true;

let roomName = "";

const addMessage = (msg) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  room.querySelector("h3").innerText = `Room ${roomName}`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("input");

  socket.emit("enter_room", { payload: input.value });
  roomName = input.value;
  showRoom();

  input.value = "";
});

socket.on("welcome", () => {
  addMessage("Someone joined");
});
