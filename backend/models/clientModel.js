/* eslint-disable no-undef */
const mongoose = require('mongoose');
const User = require('./userModel');

const clientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Klient musí mít název']
        },
        hourRate: {
            type: mongoose.Decimal128
        },
        user: {
            type: User.schema
            // required: [true, 'Klient musí být přiřazen k uživateli']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Client', clientSchema);