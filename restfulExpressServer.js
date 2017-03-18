"use strict";

let fs = require("fs");
let path = require("path");
let petsPath = path.join(__dirname, "pets.json");

let express = require("express");
let app = express();

app.set("port", process.env.PORT || 8000);

let bodyParser = require("body-parser");

app.use(bodyParser.json());
let morgan = require("morgan");

app.use(morgan("short"));

app.disable("x-powered-by");

//  GET
app.get("/pets", (req, res, next) => {
  fs.readFile(petsPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  })
})

app.get("/pets/:index", (req, res, next) => {
  let index = Number.parseInt(req.params.index);

  fs.readFile(petsPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    let pets = JSON.parse(data);

    if (Number.isNaN(index) || index < 0 || index >= pets.length) {
      return res.sendStatus(404);
    }
    res.send(pets[index]);
  })
});

//  POST
app.post("/pets", (req, res, next) => {
  let pet = req.body;

  if (!pet || pet.name === "") {
    return res.sendStatus(400);
  }
  else {
    fs.readFile(petsPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      let pets = JSON.parse(data);

      pets.push(pet)

      fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
        if (err) {
          throw err;
        }
      })
    })
    res.send(pet);
  }
});

//  PATCH
app.patch("/pets/:id", (req, res, next) => {
  if (req.body.age === "" || isNaN(req.body.age)) {
    return res.sendStatus(400);
  }
  else {
    fs.readFile(petsPath, "utf8", (err, data) => {
      if (err) {
        console.error(err.stack);

        return res.sendStatus(500);
      }

      let pets = JSON.parse(data);
      let index = parseInt(req.params.id);

      if (index < 0 || index >= pets.length || isNaN(index)) {
        return res.sendStatus(404);
      }
      else {
        for (let key in req.body) {
          pets[index][key] = req.body[key];
        }
      }
      fs.writeFile(petsPath, JSON.stringify(pets), (writeErr) => {
        console.error(writeErr);
      });
      res.set("Content-Type", "application/json");
      res.send(pets[index]);
    });
  }
});

// DELETE
app.delete("/pets/1", (req, res, next) => {
  let pet = req.body;

  if (!pet || pet.name === "") {
    return res.sendStatus(400)
  }
  else {
    fs.readFile(petsPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      let pets = JSON.parse(data);

      pet = pets[1];
      pets.splice(1, 1);
      fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
        if (err) {
          throw err;
        }
        res.send(pet);
      })
    })
  }
});

app.listen(app.get("port"), () => {
    console.log("Listening on", app.get("port"));
});

module.exports = app;
