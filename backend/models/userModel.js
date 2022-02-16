const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Uživatel musí mít křestní jméno']
        },
        lastName: {
            type: String,
            required: [true, 'Uživatel musí mít příjmení']
        },
        email: {
            type: String,
            required: [true, 'Uživatel musí mít e-mail'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Uživatel musí mít heslo']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);