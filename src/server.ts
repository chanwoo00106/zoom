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
  socket.on("join_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
  });

  socket.on("offer", (offer, roomName) => {
    console.log(offer);
    socket.to(roomName).emit("offer", offer);
  });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
