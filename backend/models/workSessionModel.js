const mongoose = require('mongoose');
const Client = require('./clientModel');
const User = require('./userModel');

const workSessionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Záznam musí mít název']
        },
        user: {
            type: User.schema,
            required: [true, 'Záznam musí být přiřazen uživateli']
        },
        client: {
            type: Client.schema,
            required: [true, 'Záznam musí být přiřazen ke klientovi']
        },
        timeStart: {
            type: Date,
            required: [true, 'Záznam musí mít čas začátku']
        },
        timeEnd: {
            type: Date,
            required: [true, 'Záznam musí mít čas konce']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('WorkSession', workSessionSchema);