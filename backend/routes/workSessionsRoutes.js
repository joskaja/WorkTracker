const express = require('express')
const router = express.Router()
const {
    getWorkSessions,
    createWorkSession,
    getWorkSession,
    updateWorkSession,
    deleteWorkSession
} = require('../controllers/workSessionController')

router.get('/', getWorkSessions)
router.post('/', createWorkSession);
router.get('/:id', getWorkSession)
router.put('/:id', updateWorkSession)
router.delete('/:id', deleteWorkSession);

module.exports = router
