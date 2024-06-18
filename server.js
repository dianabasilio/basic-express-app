//npm init -y
//npm install express body-parser

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let names = [];

//CREATE
app.post("/name", (req, res) => {
  const newName = {
    id: names.length + 1,
    name: req.body.name,
  };
  names.push(newName);
  res.status(201).json(newName);
});

//READ
app.get("/names", (req, res) => {
  res.json(names);
});

//READ - name by id

app.get("/names/:id", (req, res) => {
  const nameId = parseInt(req.params.id, 10);

  const name = names.find((name) => name.id === nameId);

  if (name) {
    res.json(name);
  } else {
    res.status(404).send("Item not found");
  }
});

//UPDATE
app.put("/names/:id", (req, res) => {
  const nameId = parseInt(req.params.id, 10);

  const nameIndex = names.findIndex((i) => i.id === nameId);

  if (nameIndex !== -1) {
    names[nameIndex].name = req.body.name;
    res.json(names[nameIndex]);
  } else {
    res.status(404).send("Name not found");
  }
});

//DELETE
app.delete("/names/:id", (req, res) => {
  const nameId = parseInt(req.params.id, 10);
  const nameIndex = names.findIndex((i) => i.id === nameId);

  if (nameIndex !== -1) {
    const deletedItem = names.splice(nameIndex, 1);
    res.json(deletedItem);
  } else {
    res.status(404).send("Item not found");
  }
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
