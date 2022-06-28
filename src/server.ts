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

wss.on("connection", (socket) => {
  console.log(`Connected to Browser`);
  socket.send("hello");

  socket.on("close", () => console.log("Disconnected from the Browser X"));
  socket.on("message", (message) => {
    console.log(message.toString());
  });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
