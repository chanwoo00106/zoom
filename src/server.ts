import http from "http";
import WebSocket from "ws";
import * as express from "express";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
