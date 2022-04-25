const bcrypt = require('bcryptjs')
const { getToken } = require('../../utils/jwt')

exports.Mutation = {
    // ---------- signUp ----------
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
    // ---------- createTaskList ----------
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
    // ---------- update Task Lists ----------
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
    // ---------- delete Task Lists ----------
    deleteTaskList: async (_, { id }, { db: { TaskList }, authUser }) => {
        if (!authUser)
            throw new Error("please login first your't Authenticated ")
        if (!id) throw new Error('fille input filed')
        await TaskList.findByIdAndDelete(id)
        return 'Deleted successfully '
    },
}
