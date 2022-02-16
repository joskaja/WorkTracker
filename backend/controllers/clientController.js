const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');
/**
@desc Get clients
@route GET /api/work-sessions
**/
const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.find({});
    res.json(clients);
});

/**
@desc Create clients
@route POST /api/work-sessions
**/
const createClient = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Název klienta je povinný');
    }
    const client = new Client({
        name: req.body.name,
        hourRate: req.body.hourRate
    });
    client.save();
    res.json(client)
});

/**
@desc Get one client
@route POST /api/work-sessions/:id
**/
const getClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id)
    res.json(client)
});

/**
@desc Update one client
@route PUT /api/work-sessions/:id
**/
const updateClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (!client) throw new Error('Client nebyl nalezen');

    client.name = req.body.name || client.name;
    client.hourRate = req.body.hourRate || client.hourRate;

    await client.save();
    res.json(client)
});
/**
@desc Delete one client
@route DELETE /api/work-sessions/:id
**/
const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (!client) throw new Error('Client nebyl nalezen');
    await client.remove();
    res.json({ message: `DELETE client ID: ${req.params.id}` })
});

module.exports = {
    getClients,
    createClient,
    getClient,
    updateClient,
    deleteClient
}
