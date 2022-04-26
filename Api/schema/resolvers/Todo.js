exports.Todo = {
    taskList: async ({ taskListId }, args, { db: { TaskList }, authUser }) =>
        await TaskList.findById(taskListId),
}
