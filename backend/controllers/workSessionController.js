const asyncHandler = require('express-async-handler');
const WorkSession = require('../models/workSessionModel');
/**
@desc Get work sessions
@route GET /api/work-sessions
**/
const getWorkSessions = asyncHandler(async (req, res) => {
    const workSessions = await WorkSession.find({});
    res.json({
        message: 'GET work sessions',
        workSessions: workSessions
    });
});

/**
@desc Create work sessions
@route POST /api/work-sessions
**/
const createWorkSession = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Název záznamu je povinný');
    }
    res.json({ message: 'Create work session: ' + req.body.name })
});

/**
@desc Get one work session
@route POST /api/work-sessions/:id
**/
const getWorkSession = asyncHandler(async (req, res) => {
    res.json({ message: `GET work session ID: ${req.params.id}` })
});

/**
@desc Update one work session
@route PUT /api/work-sessions/:id
**/
const updateWorkSession = asyncHandler(async (req, res) => {
    res.json({ message: `UPDATE work session ID: ${req.params.id}` })
});
/**
@desc Delete one work session
@route DELETE /api/work-sessions/:id
**/
const deleteWorkSession = asyncHandler(async (req, res) => {
    res.json({ message: `DELETE work session ID: ${req.params.id}` })
});

module.exports = {
    getWorkSessions,
    createWorkSession,
    getWorkSession,
    updateWorkSession,
    deleteWorkSession
}
