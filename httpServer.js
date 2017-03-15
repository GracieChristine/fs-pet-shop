"use strict"

let http = require("http")
let url = require("url")
let fs = require("fs")
let port = 8000

let server = http.createServer((req, res) => {
  let pathName = url.parse(req.url).pathname
  let pathArr = pathName.match(/[^/]+/g);

  fs.readFile("pets.json", "utf8", (err, data) => {

    if (err) throw err;
    else if (pathArr.length === 0) {
      console.error(err.stack);
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");

      return res.end("Internal Server Error");
    }
    else if (pathArr.length === 1 && pathArr[0] === "pets") {
      let petArr = JSON.parse(data)

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(petArr))
    }
    else if (pathArr[1] === 0 && pathArr[0] === "pets") {
      let pet0 = JSON.parse(data)[0]

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(pet0))
    }
    else if (pathArr[1] === 1 && pathArr[0] === "pets") {
      let pet1 = JSON.parse(data)[1]

      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(pet1))
    }
    else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }
  })
})

server.listen(port, (err) => {
  console.log("On THIS PORT NOW...", port);
});

module.exports = server;
