const express = require("express");
const bodyparser = require("body-parser");
const db = require("./db/models/index");
const app = express();

console.log(db);

app.use(bodyparser.json());

app.get("/posts", function (req, res) {
  res.json(Object.values(db.posts));
});

app.get("/posts/:id", function (req, res) {
  const id = req.params.id;
  if (db.posts[id] !== undefined) {
    res.json(db.posts[id]);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/posts/:id", function (req, res) {
  const id = req.params.id;
  if (db.posts[id] !== undefined) {
    delete db.posts[id];
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.post("/posts", function (req, res) {
  const post = req.body;
  if (post.title === undefined || post.title === "") {
    res.status(400).json({
      title: "title must not be empty",
    });
  } else if (post.description === undefined || post.description === "") {
    res.status(400).json({
      description: "description must not be empty",
    });
  } else {
    post.id = Date.now();
    db.posts[post.id] = post;
    res.status(201).json(post);
  }
});

app.put("/posts/:id", function (req, res) {
  const id = req.params.id;
  if (db.posts[id] !== undefined) {
    const post = db.posts[id];
    for (let key in req.body) {
      post[key] = req.body[key];
    }
    db.posts[post.id] = post;
    res.json(post);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000);
