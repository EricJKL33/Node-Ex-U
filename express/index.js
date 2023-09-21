const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const port = 3000;

app.use(session({ secret: "FdnwJBy54LF6QJkeRLAOJIrTo36xe0ZF", resave: false, saveUninitialized: true }));
app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logRequest = (req, res, next) => {
  console.log(
    `> ${new Date().toLocaleTimeString()} - [${req.method}] ${req.originalUrl}`
  );

  req.user = { id: 5 };

  next();
};

app.use(logRequest);

app.get("/", (req, res) => {
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views++;
  res.send(
    `Hello from Express! Vous avez consulté ${req.session.views} fois la page`
  );
});

app.get("/bonjour", (req, res) => {
  res.send("<h1>Bonjour tout le monde!</h1>");
});

app.post("/form", (req, res) => {
  console.log(req.body);
  if (req.body.password == "1234") {
    res.send("connexion réussie");
  } else {
    res.redirect("/fichier/html?mdpIcorrect=1");
  }
});

app.get("/articles/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send(`Vous avez demandé l'article ${req.params.id}`);
});

app.get("/fichier/html", (req, res) => {
  res.sendFile(path.join(__dirname, "views/page.html"));
});

app.post("/fichier/html", (req, res) => {
  console.log(req.body);

  if (req.body.password == "1234") {
    res.send("connexion réussie");
  } else {
    res.redirect("/fichier/html?mdpIcorrect=1");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
