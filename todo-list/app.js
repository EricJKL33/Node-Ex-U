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



app.get("/", (req, res) => {
  res.render("todolist", { tasks: tasks });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
