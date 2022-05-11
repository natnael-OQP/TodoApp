const bcrypt = require('bcryptjs')
const { getToken } = require('../../utils/jwt')
const mongoose = require('mongoose')

exports.Mutation = {
    //                                               ---------- Auth User ----------

    signUp: async (_, { input }, { db: { User } }) => {
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(input.password, salt)

        const newUser = {
            ...input,
            password: hashPassword,
        }
        const user = await User.create(newUser)
        return { token: getToken(user), user }
    },
    // ---------- signIn ----------
    signIn: async (_, { input: { password, email } }, { db: { User } }) => {
        try {
            const user = await User.findOne({ email })
            if (!user) throw new Error('invalid credentials ')

            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) throw new Error('invalid credentials ')

            return { token: getToken(user), user }
        } catch (error) {
            throw new Error(error)
        }
    },

    //                                               ---------- CRUD Task List ----------

    createTaskList: async (_, { title }, { db: { TaskList }, authUser }) => {
        if (!authUser)
            throw new Error("please login first your't Authenticated ")
        if (!title) throw new Error('fille input filed')
        try {
            const newTaskList = { title, userIds: authUser._id || authUser.id }
            const taskList = await TaskList.create(newTaskList)
            return taskList
        } catch (error) {
            throw new Error(error)
        }
    },
    updateTaskList: async (
        _,
        { id, title },
        { db: { TaskList }, authUser }
    ) => {
        if (!authUser)
            throw new Error("please login first your't Authenticated ")
        if (!title || !id) throw new Error('fille input filed')
        const taskList = await TaskList.findById(id)
        if (!taskList) throw new Error('task list Not Found')

        const updated = await TaskList.findByIdAndUpdate(
            id,
            { title },
            { new: true }
        )

        return updated
    },
    deleteTaskList: async (_, { id }, { db: { TaskList }, authUser }) => {
        try {
            if (!authUser)
                throw new Error("please login first your't Authenticated ")
            if (!id) throw new Error('fille input filed')
            await TaskList.findByIdAndDelete(id)
            return 'Deleted successfully '
        } catch (error) {
            throw new Error(error)
        }
    },
    addUserToTaskList: async (
        _,
        { taskListId, userId },
        { db: { TaskList }, authUser }
    ) => {
        try {
            //  handel Error
            if (!authUser)
                throw new Error("please login first your't Authenticated ")
            if (!taskListId || !userId) throw new Error('fille input filed')
            const taskList = await TaskList.findById(taskListId)
            if (!taskList) throw new Error('Task List Not Found')
            let updatedData
            if (taskList?.userIds.includes(mongoose.Types.ObjectId(userId))) {
                console.log('already exist ')
                updatedData = await TaskList.findByIdAndUpdate(
                    taskListId,
                    { $pull: { userIds: userId } },
                    { new: true }
                )
            } else {
                updatedData = await TaskList.findByIdAndUpdate(
                    taskListId,
                    { $push: { userIds: userId } },
                    { new: true }
                )
            }

            return updatedData
        } catch (error) {
            throw new Error(error)
        }
    },

    //                                               ---------- CRUD Todo ----------

    createTodo: async (
        _,
        { content, taskListId },
        { db: { Todo }, authUser }
    ) => {
        if (!authUser)
            throw new Error("please login first your't Authenticated ")
        if (!taskListId || !content) throw new Error('fille input filed')

        try {
            const newTodo = { content, taskListId }
            return await Todo.create(newTodo)
        } catch (error) {
            throw new Error(error)
        }
    },
    updateTodo: async (
        _,
        { content, todoId, isCompleted },
        { db: { Todo }, authUser }
    ) => {
        if (!authUser)
            throw new Error("please login first your't Authenticated ")
        if (!todoId || !content) throw new Error('fille input filed')

        const todo = await Todo.findById(todoId)
        if (!todo) throw new Error('Todo Not Found')

        try {
            return await Todo.findByIdAndUpdate(
                todoId,
                { content, isCompleted },
                { new: true }
            )
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteTodo: async (_, { todoId }, { db: { Todo }, authUser }) => {
        if (!authUser)
            throw new Error("please login first your't Authenticated ")
        if (!todoId) throw new Error('fille input filed')

        const todo = await Todo.findById(todoId)
        if (!todo) throw new Error('Todo Not Found')

        try {
            await Todo.findByIdAndDelete(todoId)
            return 'deleted successfully '
        } catch (error) {
            throw new Error(error)
        }
    },
}
