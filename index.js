const express = require("express");

const server = express();
server.use(express.json());

const projects = [];
var counter = 0;

function checkID(req, res, next) {
  const { id } = req.params;
  const project = projects.find(item => item.id == id);
  if (!project) {
    return res.status(404).json({ message: `Project not found with id ${id}` });
  }
  return next();
}

function counterReqs(req, res, next) {
  counter++;
  console.log(`We already had ${counter} requests`);
  return next();
}

server.use(counterReqs);

server.post("/projects", (req, res) => {
  const { title } = req.body;
  const { id } = req.body;
  const { task } = req.body;

  const Project = {
    id,
    title,
    task
  };

  projects.push(Project);
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkID, (req, res) => {
  const { id } = req.params;

  var project = projects.find(item => {
    return (item.id = id);
  });

  return res.json(project);
});

server.put("/projects/:id", checkID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  var project = projects.find(item => item.id == id);

  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkID, (req, res) => {
  const { id } = req.params;

  var index = projects.findIndex(item => {
    return (item.id = id);
  });

  console.log(index);
  projects.splice(index, 1);
  return res.json(projects);
});

server.listen(3000);
