const mongoose = require('mongoose')

const TaskListSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            default: '',
        },
        userIds: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('TaskList', TaskListSchema)
