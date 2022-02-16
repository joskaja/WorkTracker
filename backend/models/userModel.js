const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, 'Uživatel musí mít křestní jméno']
        },
        last_name: {
            type: String,
            required: [true, 'Uživatel musí mít příjmení']
        },
        email: {
            type: String,
            required: [true, 'Uživatel musí mít e-mail']
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