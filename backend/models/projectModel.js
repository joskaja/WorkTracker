const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Projekt musí mít název']
        },
        hourRate: {
            type: Number
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Projekt musí být přiřazen k uživateli']
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Project', projectSchema);