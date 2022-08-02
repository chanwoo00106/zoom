import * as http from "http";
import * as express from "express";
import { Server } from "socket.io";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event : ${event}`);
  });

  socket.on("enter_room", (roomName) => {
    socket.join(roomName.payload);
    socket.to(roomName.payload).emit("welcome");
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye"));
  });

  socket.on("new_message", (msg, room) => {
    socket.to(room.toString()).emit("new_message", msg);
  });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
