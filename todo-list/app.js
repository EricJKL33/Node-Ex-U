const express = require("express");
const app = express();
const port = 3000;

const tasks = [
  {
    title: "Example task 1",
    done: false,
  },
  {
    title: "Example task 2",
    done: true,
  },
];

console.log(tasks);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.post("/task", (req, res) => {
  if (req.body.task) {
    tasks.push({
      title: req.body.task,
      done: false,
    });
  }
  res.redirect("/");
});

app.get("/task/:id/done", (req, res) => {
  if (tasks[req.params.id]) {
    tasks[req.params.id].done = true;
  }
  res.redirect("/");
});

app.get("/task/:id/delete", (req, res) => {
  if (tasks[req.params.id]) {
    tasks.splice(req.params.id, 1);
  }
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("todolist", { tasks: tasks });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
