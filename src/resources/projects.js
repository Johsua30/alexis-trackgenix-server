import express from 'express';
import fs from 'fs';
import projects from '../data/projects.json';

const router = express.Router();

// Get all
router.get('/', (req, res) => res.json(projects));

// Get single element
// by id
router.get('/id=:id', (req, res) => {
  const found = projects.some((project) => project.id === Number(req.params.id));
  if (found) {
    res.json(projects.filter((project) => project.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});
// by name
router.get('/name=:name', (req, res) => {
  const found = projects.find((project) => project.name.toLowerCase() === req.params.name);
  if (found) {
    res.json(projects.filter((project) => project.name.toLowerCase() === req.params.name));
  } else {
    res.status(400).json({ msg: `No project with the name of ${req.params.name}` });
  }
});

// create new element
router.post('/add', (req, res) => {
  const initialValue = 0;
  const ids = projects.reduce(
    (previousValue, currentValue) => (previousValue <= currentValue.id ? currentValue.id + 1
      : previousValue),
    initialValue,
  );
  const newProject = {
    id: ids,
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    clientName: req.body.clientName,
    active: true,
    devRate: req.body.devRate,
    qaRate: req.body.qaRate,
    pmRate: req.body.pmRate,
    tlRate: req.body.tlRate,
    devs: req.body.devs,
    qas: req.body.qas,
    projectManager: req.body.projectManager,
    techLeader: req.body.techLeader,
    admin: req.body.admin,
  };
  if (!(newProject.name && newProject.description && newProject.endDate
 && newProject.startDate && newProject.clientName && newProject.devRate && newProject.qaRate
  && newProject.pmRate && newProject.tlRate && newProject.devs && newProject.qas
  && newProject.projectManager && newProject.techLeader && newProject.admin)) {
    res.status(400).json({ msg: 'Please fill in all fields' });
  } else {
    projects.push(newProject);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('New project added');
      }
    });
  }
});

// Update Project
router.put('/update=:id', (req, res) => {
  const idProject = Number(req.params.id);
  const found = projects.find((project) => project.id === idProject);
  const updProjectFilter = projects.filter((project) => project.id !== idProject);
  const newProject = {
    id: Number(req.params.id),
    name: (req.body.name || found.name),
    description: (req.body.description || found.description),
    startDate: (req.body.startDate || found.startDate),
    endDate: (req.body.endDate || found.endDate),
    clientName: (req.body.clientName || found.clientName),
    active: (req.body.active || found.active),
    devRate: (req.body.devRate || found.devRate),
    qaRate: (req.body.qaRate || found.qaRate),
    pmRate: (req.body.pmRate || found.pmRate),
    tlRate: (req.body.tlRate || found.tlRate),
    devs: (req.body.devs || found.devs),
    qas: (req.body.qas || found.qas),
    projectManager: (req.body.projectManager || found.projectManager),
    techLeader: (req.body.techLeader || found.techLeader),
    admin: (req.body.admin || found.admin),
  };
  if (!(found)) {
    res.status(400).json({ msg: 'Please fill in a valid id' });
  } else {
    updProjectFilter.push(newProject);
    fs.writeFile('src/data/projects.json', JSON.stringify(updProjectFilter), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project updated');
      }
    });
  }
});

export default router;
