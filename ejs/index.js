const express = require("express");
const app = express();
const ejs = require("ejs");
const port = 3000;

const articles = [
  {
    title: "Example title 1",
    category: "Example category 1",
  },
  {
    title: "Example title 2",
    category: "Example category 2",
  },
  {
    title: "Example title 3",
    category: "Example category 3",
  },
];

app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/hello/:name", (req, res) => {
  res.render("pages/hello", { name: req.params.name });
});

app.get("/posts", (req, res) => {
  res.render("pages/posts-list", { posts: articles });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
