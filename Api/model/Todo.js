const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            require: true,
            default: '',
        },
        taskListId: {
            type: String,
            require: true,
            default: '',
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('Todo', TodoSchema)
