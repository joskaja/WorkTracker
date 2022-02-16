const mongoose = require('mongoose');

const workSessionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Záznam musí mít název']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Záznam musí být přiřazen uživateli']
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
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