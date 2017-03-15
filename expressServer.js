"use strict"

let http = require("http");
let fs = require("fs");
let express = require("express");
let path = require("path");
let petsPath = path.join(__dirname, "pets.json");

let app = express();
let port = 8000;

app.disable("x-powered-by");

app.get("/pets", (req, res) => {
  fs.readFile(petsPath, "utf8", (err, petsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(404);
    }
    let pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

app.get("/pets/:id", (req, res) => {
  fs.readFile(petsPath, "utf8", (err, petsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set("Content-Type", "application/json");
    res.send(pets[id]);
  });
});

app.use((req, res) => {
  // res.set("Content-Type", "text/plain");
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log("I'm on the port...", port);
})
