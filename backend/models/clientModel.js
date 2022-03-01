/* eslint-disable no-undef */
const mongoose = require('mongoose');

const clientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Klient musí mít název']
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        address: {
            city: String,
            street: String,
            zipCode: String
        },
        color: {
            type: String
        },
        defaultHourRate: {
            type: Number
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Klient musí být přiřazen k uživateli']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Client', clientSchema);