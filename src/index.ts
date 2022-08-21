import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/*", (_, res) => {
  res.render("index.ejs");
});

app.listen(8080, () => console.log("http://localhost:8080"));
