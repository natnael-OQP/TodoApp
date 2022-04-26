exports.TaskList = {
    users: async ({ userIds }, _, { db: { User }, authUser }) =>
        await Promise.all(userIds.map((userId) => User.findById(userId))),
    progress: async ({ id, _id }, _, { db: { Todo }, authUser }) => {
        const totalTodos = await Todo.find({ taskListId: id || _id })
        const completed = totalTodos.filter((todo) => todo.isCompleted)
        if (totalTodos.length === 0) {
            return 0.0
        }
        return (completed.length / totalTodos.length) * 100
    },
    todos: async ({ id, _id }, _, { db: { Todo }, authUser }) =>
        await Todo.find({ taskListId: id || _id }),
}
