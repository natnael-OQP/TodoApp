const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            default: '',
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('User', UserSchema)
