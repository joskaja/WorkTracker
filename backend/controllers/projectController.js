const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');
/**
@desc Get projects
@route GET /api/work-sessions
**/
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.where('user').equals(req.user.id).populate('client');
    res.json(projects);
});

/**
@desc Create projects
@route POST /api/work-sessions
**/
const createProject = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Název projektu je povinný');
    }
    const project = new Project({
        user: req.user.id,
        name: req.body.name,
        hourRate: req.body.hourRate,
        client: req.body.client || null
    });
    project.save();
    res.json(project)
});

/**
@desc Get one project
@route POST /api/work-sessions/:id
**/
const getProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)
    res.json(project)
});

/**
@desc Update one project
@route PUT /api/work-sessions/:id
**/
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404);
        throw new Error('Projekt nebyl nalezen');
    }
    if (project.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Uživatel nemá k této akci oprávnění');
    }
    project.name = req.body.name || project.name;
    project.hourRate = req.body.hourRate;
    project.client = req.body.client;

    await project.save();
    res.json(project)
});
/**
@desc Delete one project
@route DELETE /api/work-sessions/:id
**/
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404);
        throw new Error('Project nebyl nalezen');
    }
    if (project.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Uživatel nemá k této akci oprávnění');
    }
    await project.remove();
    res.json({ message: `DELETE project ID: ${req.params.id}` })
});

module.exports = {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject
}
