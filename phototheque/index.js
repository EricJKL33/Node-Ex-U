const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const path = require("path");
const albumRoutes = require("./routes/album.routes");

const app = express();

mongoose.connect("mongodb://localhost:27017/phototheque", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.render("/albums");
});

app.use("/", albumRoutes);

app.use((req, res) => {
  res.status(404);
  res.send("Page not found !");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.send("Erreur interne du serveur");
});

app.listen(3000, () => {
  console.log("Server started (http://localhost:3000) !");
});
