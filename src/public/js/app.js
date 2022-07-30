const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("input");

  socket.emit("enter_room", { payload: input.value });

  input.value = "";
});
