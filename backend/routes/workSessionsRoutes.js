const express = require('express');
const router = express.Router();
const {
    getWorkSessions,
    createWorkSession,
    getWorkSession,
    updateWorkSession,
    deleteWorkSession
} = require('../controllers/workSessionController');
const protectRoute = require('../middleware/authMiddleware');

router.get('/', protectRoute, getWorkSessions);
router.post('/', protectRoute, createWorkSession);
router.get('/:id', protectRoute, getWorkSession);
router.put('/:id', protectRoute, updateWorkSession);
router.delete('/:id', protectRoute, deleteWorkSession);

module.exports = router
