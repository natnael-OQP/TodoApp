exports.Query = {
    myTaskList: async (_, args, { db: { TaskList }, authUser }) => {
        if (!authUser)
            throw new Error("please login first your't Authenticated ")

        return await TaskList.find({
            userIds: { $in: [authUser._id] },
        })
    },

    getTaskList: async (_, { id }, { db: { TaskList }, authUser }) => {
        try {
            if (!authUser)
                throw new Error("please login first your't Authenticated ")
            if (!id) throw new Error('fille input filed')
            const taskList = await TaskList.findById(id)
            if (!taskList) throw new Error('Task List Not Found')
            return taskList
        } catch (error) {
            throw new Error(error)
        }
    },
}
