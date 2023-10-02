const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

mongoose.connect("mongodb://localhost:27017/phototheque", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("ok");
});

app.use((req, res) => {
  res.status(404);
  res.send("Page not found !");
});

app.listen(3000, () => {
  console.log("Server started (http://localhost:3000/) !");
});
