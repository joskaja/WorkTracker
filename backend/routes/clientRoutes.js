const express = require('express');
const router = express.Router();
const {
    getClients,
    createClient,
    getClient,
    updateClient,
    deleteClient
} = require('../controllers/clientController');
const protectRoute = require('../middleware/authMiddleware');

router.get('/', protectRoute, getClients);
router.post('/', protectRoute, createClient);
router.get('/:id', protectRoute, getClient);
router.put('/:id', protectRoute, updateClient);
router.delete('/:id', protectRoute, deleteClient);

module.exports = router
