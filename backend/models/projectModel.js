const mongoose = require('mongoose');
const WorkSession = require('./workSessionModel');

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

projectSchema.pre('remove', function (next) {
    WorkSession.remove({ project: this._id }).exec();
    next();
});

module.exports = mongoose.model('Project', projectSchema);