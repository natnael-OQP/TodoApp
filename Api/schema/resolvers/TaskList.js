exports.TaskList = {
    users: async ({ userIds }, _, { db: { User }, authUser }) =>
        await Promise.all(userIds.map((userId) => User.findById(userId))),
    progress: (parent, args, { db, authUser }) => 0.2,
    todos: async ({ id, _id }, _, { db: { Todo }, authUser }) =>
        await Todo.find({ taskListId: id || _id }),
}
