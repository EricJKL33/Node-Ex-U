const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

// const tasks = [
//   {
//     title: "Example task 1",
//     done: false,
//   },
//   {
//     title: "Example task 2",
//     done: true,
//   },
// ];

// console.log(tasks);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

app.post("/task", (req, res) => {
  if (req.body.task) {
    req.session.tasks.push({
      title: req.body.task,
      done: false,
    });
  }
  res.redirect("/");
});

app.get("/task/:id/done", (req, res) => {
  if (req.session.tasks[req.params.id]) {
    req.session.tasks[req.params.id].done = true;
  }
  res.redirect("/");
});

app.get("/task/:id/delete", (req, res) => {
  if (req.session.tasks[req.params.id]) {
    req.session.tasks.splice(req.params.id, 1);
  }
  res.redirect("/");
});

app.get("/", (req, res) => {
  if (!req.session.tasks) {
    req.session.tasks = [];
  }
  res.render("todolist", { tasks : req.session.tasks });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
