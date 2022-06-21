import * as express from "express";
const app = express();

console.log("hello");

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000);
