const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');
/**
@desc Get clients
@route GET /api/work-sessions
**/
const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.where('user').equals(req.user.id);
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
        email: req.body.email,
        name: req.body.name,
        defaultHourRate: req.body.defaultHourRate,
        phone: req.body.phone,
        color: req.body.color,
        address: {
            street: req.body.street,
            city: req.body.city,
            zipCode: req.body.zipCode
        }
    });
    client.save();
    console.log(client);
    res.json(client)
});

/**
@desc Get one client
@route POST /api/work-sessions/:id
**/
const getClient = asyncHandler(async (req, res) => {
    const client = await Client.findOne({
        _id: req.params.id,
        user: req.user.id
    })
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
    client.email = req.body.email;
    client.name = req.body.name;
    client.phone = req.body.phone;
    client.color = req.body.color;
    client.defaultHourRate = req.body.defaultHourRate;
    client.address = {
        street: req.body.street,
        city: req.body.city,
        zipCode: req.body.zipCode
    };
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
        throw new Error('Zákazník nebyl nalezen');
    }
    if (client.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Uživatel nemá k této akci oprávnění');
    }
    await client.remove();
    res.json({ message: `Zákazník "${client.name}" byl odstraněn.` })
});

module.exports = {
    getClients,
    createClient,
    getClient,
    updateClient,
    deleteClient
}
