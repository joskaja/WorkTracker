const express = require('express');
const router = express.Router();
const {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const protectRoute = require('../middleware/authMiddleware');

router.get('/', protectRoute, getProjects);
router.post('/', protectRoute, createProject);
router.get('/:id', protectRoute, getProject);
router.put('/:id', protectRoute, updateProject);
router.delete('/:id', protectRoute, deleteProject);

module.exports = router
