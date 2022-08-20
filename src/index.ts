import express from "express";

const app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (_, res) => {
  res.render("index.ejs");
});

app.listen(8080, () => console.log("http://localhost:8080"));
