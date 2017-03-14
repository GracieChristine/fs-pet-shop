"use strict";

let fs = require("fs");
let path = require("path");

let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];
let num = process.argv[3];

if (cmd === "read") {
  fs.readFile("pets.json", "utf8", (err, data) => {
    data = JSON.parse(data);

    if (err) {
      throw err;
    }
    else if (num < 0 || num > data.length) {
      console.log(`USAGE node pets.js read INDEX`);
      process.exit(1);
    }
    else if (num === undefined) {
      console.log(data);
    }
    else {
      console.log(data[num]);
    }
  });
}
else if (cmd === "create") {
  fs.readFile("pets.json", "utf8", (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);
    let newPet = {
      age: parseInt(process.argv[3]),
      kind: process.argv[4],
      name: process.argv[5]
    }

    if (process.argv.length !== 6) {
      console.error(`Usage: node pets.js create AGE KIND NAME`);
      process.exit(1);
    }
    pets.push(newPet);
    console.log(newPet);
    let petsJSON = JSON.stringify(pets);

    fs.writeFile("pets.json", petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}
else if (cmd === "update") {
  fs.readFile("pets.json", "utf8", (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);
    let updatedPet = {
      age: parseInt(process.argv[4]),
      kind: process.argv[5],
      name: process.argv[6]
    }

    if (process.argv.length !== 7) {
      console.error(`Usage: node pets.js update INDEX AGE KIND NAME`);
      process.exit(1);
    }
    pets[process.argv[3]] = updatedPet
    console.log(updatedPet);
    let petsJSON = JSON.stringify(pets);

    fs.writeFile("pets.json", petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}
else if (cmd === "destroy") {
  fs.readFile("pets.json", "utf8", (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);

    if (process.argv[3] === undefined) {
      console.error(`Usage: node pets.js destroy INDEX`);
      process.exit(1);
    }
    let destroyPet = pets.splice(process.argv[3], 1);

    console.log(destroyPet);
    let petsJSON = JSON.stringify(pets);

    fs.writeFile("pets.json", petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1)
}
