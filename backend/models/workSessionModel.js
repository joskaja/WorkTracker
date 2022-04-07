const mongoose = require('mongoose');

const workSessionSchema = mongoose.Schema(
    {
        description: {
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
            ref: 'Client'
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        },
        startTime: {
            type: Date,
            required: [true, 'Záznam musí mít čas začátku']
        },
        endTime: {
            type: Date,
            required: [true, 'Záznam musí mít čas konce']
        }
    },
    {
        timestamps: true
    }
);

workSessionSchema.virtual('duration').get(function () {
    return Math.abs(this.endTime.getTime() - this.startTime.getTime()) / 3600000;
});
workSessionSchema.set('toJSON', { virtuals: true, getters: true });

module.exports = mongoose.model('WorkSession', workSessionSchema);