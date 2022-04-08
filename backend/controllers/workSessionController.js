const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');
const WorkSession = require('../models/workSessionModel');
/**
@desc Get work sessions
@route GET /api/work-sessions
**/
const getWorkSessions = asyncHandler(async (req, res) => {
    const filters = {
        user: req.user.id
    };

    if (req.query.startTime) filters.startTime = { $gte: new Date(parseInt(req.query.startTime)) };
    if (req.query.endTime) filters.endTime = { $lte: new Date(parseInt(req.query.endTime)) };

    const workSessions = await WorkSession.find(filters).sort({ endTime: -1 }).populate(['client', 'project']);
    res.json(workSessions);
});

/**
@desc Create work sessions
@route POST /api/work-sessions
**/
const createWorkSession = asyncHandler(async (req, res) => {
    if (!req.body.description) {
        res.status(400);
        throw new Error('Popis je povinný');
    }

    if (new Date(req.body.startTime).getTime() > new Date(req.body.endTime).getTime()) {
        res.status(400);
        throw new Error('Začátek nesmí být později než konec.');
    }
    const overlaps = await getOverlappingWorkSessions(req.user.id, new Date(req.body.startTime), new Date(req.body.endTime));
    console.log(overlaps);
    if (overlaps.length > 0) {
        res.status(400);
        throw new Error(`Nalezen ${overlaps.length} překrývající se záznam(y). Záznamy se nesmí překrývat.`);
    }

    if (req.body.project && req.body.client) {
        const project = await Project.findById(req.body.project);
        if (project && !project.client) {
            project.client = req.body.client;
            project.save();
        }
    }

    const workSession = new WorkSession({
        user: req.user.id,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        client: req.body.client || null,
        project: req.body.project || null
    });
    await workSession.save();
    await workSession.populate(['client', 'project']);
    res.json(workSession)
});

/**
@desc Get one work session
@route POST /api/work-sessions/:id
**/
const getWorkSession = asyncHandler(async (req, res) => {
    const workSession = await WorkSession.findById(req.params.id)
    console.log(workSession);
    if (workSession.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Uživatel nemá k této akci oprávnění');
    }

    res.json(workSession)
});

/**
@desc Update one work session
@route PUT /api/work-sessions/:id
**/
const updateWorkSession = asyncHandler(async (req, res) => {
    const workSession = await WorkSession.findById(req.params.id);
    if (!workSession) {
        res.status(404);
        throw new Error('Projekt nebyl nalezen');
    }

    if (new Date(req.body.startTime).getTime() > new Date(req.body.endTime).getTime()) {
        res.status(400);
        throw new Error('Začátek nesmí být později než konec.');
    }

    if (workSession.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Uživatel nemá k této akci oprávnění');
    }

    const overlaps = await getOverlappingWorkSessions(req.user.id, new Date(req.body.startTime), new Date(req.body.endTime));
    console.log(overlaps);
    if (overlaps.length > 0 && !(overlaps.length === 1 && overlaps[0]._id.toString() === req.params.id)) {
        res.status(400);
        throw new Error(`Nalezen ${overlaps.length} překrývající se záznam(y). Záznamy se nesmí překrývat.`);
    }

    workSession.description = req.body.description || workSession.description;
    workSession.project = req.body.project;
    workSession.client = req.body.client;
    workSession.startTime = req.body.startTime;
    workSession.endTime = req.body.endTime;

    await workSession.save();
    await workSession.populate(['client', 'project']);

    res.json(workSession)
});
/**
@desc Delete one work session
@route DELETE /api/work-sessions/:id
**/
const deleteWorkSession = asyncHandler(async (req, res) => {
    const workSession = await WorkSession.findById(req.params.id);
    if (!workSession) {
        res.status(404);
        throw new Error('Záznam nebyl nalezen');
    }
    if (workSession.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Uživatel nemá k této akci oprávnění');
    }
    await workSession.remove();
    res.json({ message: `Záznam "${workSession.description}" byl úspěšně odstraněn.`, id: req.params.id })
});

const getOverlappingWorkSessions = (user, start, end) => {
    start = new Date(start.getTime() + 1000);
    end = new Date(end.getTime() - 1000);
    return WorkSession.find({
        $and: [
            { user: user }
        ],
        $or: [
            { startTime: { $lte: start }, endTime: { $gte: start } },
            { startTime: { $lte: end }, endTime: { $gte: end } },
            { startTime: { $gt: start }, endTime: { $lt: end } }
        ]
    });
};

module.exports = {
    getWorkSessions,
    createWorkSession,
    getWorkSession,
    updateWorkSession,
    deleteWorkSession
}
