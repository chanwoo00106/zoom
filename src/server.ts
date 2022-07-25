import * as WebSocket from "ws";
import * as http from "http";
import * as express from "express";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets: WebSocket.WebSocket[] = [];

wss.on("connection", (socket) => {
  sockets.push(socket);

  console.log(`Connected to Browser`);

  socket.on("close", () => console.log("Disconnected from the Browser X"));
  socket.on("message", (message) => {
    sockets.forEach((s) => s.send(message.toString()));
  });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
