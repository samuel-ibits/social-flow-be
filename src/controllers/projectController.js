
// src/controllers/projectController.js
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const project = await Project.create({ ...req.body, userId: req.user._id });
  res.json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user._id });
  res.json(projects);
};