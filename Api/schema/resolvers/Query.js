exports.Query = {
    myTaskList: async (_, args, { db: { TaskList }, authUser }) => {
        if (!authUser)
            throw new Error("please login first your't Authenticated ")

        return await TaskList.find({
            userIds: { $in: [authUser._id] },
        })
    },
}
