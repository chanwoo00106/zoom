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

  room.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = room.querySelector("input");
    socket.emit("new_message", input.value, roomName);
    addMessage(`You: ${input.value}`);
    input.value = "";
  });
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

socket.on("bye", () => {
  addMessage("someone left");
});

socket.on("new_message", addMessage);
