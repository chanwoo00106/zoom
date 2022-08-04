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

const publicRooms = () => {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;

  const publicRooms = [];

  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) publicRooms.push(key);
  });

  return publicRooms;
};

io.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  socket.onAny((event) => {
    console.log(`Socket Event : ${event}`);
  });

  socket.on("enter_room", (roomName) => {
    socket.join(roomName.payload);
    socket.to(roomName.payload).emit("welcome", socket["nickname"]);
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket["nickname"])
    );
  });

  socket.on("new_message", (msg, room) => {
    socket
      .to(room.toString())
      .emit("new_message", `${socket["nickname"]}: ${msg}`);
  });

  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
