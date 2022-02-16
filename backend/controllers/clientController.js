const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');
/**
@desc Get clients
@route GET /api/work-sessions
**/
const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.find({ user: req.user.id });
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
        user: req.user.id,
        name: req.body.name,
        address: req.body.address
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
    if (!client) {
        res.status(404);
        throw new Error('Client nebyl nalezen');
    }
    if (client.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Uživatel nemá k této akci oprávnění');
    }
    client.name = req.body.name || client.name;
    client.address = req.body.address || client.name;

    await client.save();
    res.json(client)
});
/**
@desc Delete one client
@route DELETE /api/work-sessions/:id
**/
const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (!client) {
        res.status(404);
        throw new Error('Client nebyl nalezen');
    }
    if (client.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Uživatel nemá k této akci oprávnění');
    }
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
