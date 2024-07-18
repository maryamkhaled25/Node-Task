
import { Category } from "../../../databases/models/category.model.js"
import { Task } from "../../../databases/models/task.model.js"
import { catchAsyncErr } from "../../utilies/catchError.js"


//1- create task
const createTask = catchAsyncErr(async (req, res) => {
    const { title, taskType, textBody, categoryID, shared, contentList } = req.body
    const createdBy = req.user.user._id
    const category = await Category.findOne({ _id: categoryID, ownedBy: createdBy })
    if (!category) {
        return res.status(404).json({ message: "Category is not found" })
    }
    const newTask = await Task.insertMany({
        title, taskType, textBody, shared, categoryID, createdBy,
        contentList: type === 'list' ? contentList.map(item => ({ text: item })) : []
    })
    res.json({ message: "Task added successfully", newTask })
})

//2- update task
const updateTask = catchAsyncErr(async (req, res) => {
    const { taskID } = req.params
    const { title, taskType, textBody, shared, contentList } = req.body
    const createdBy = req.user.user._id

    const task = await Task.findOneAndUpdate({ _id: taskID, createdBy }, {
        title, taskType, textBody, shared,
        contentList: type === 'list' ? contentList.map(item => ({ text: item })) : []
    }, { new: true, runValidators: true })

    if (!task) {
        return res.status(404).json({ message: "Task is not found" })
    }
    res.status(200).json({ message: "Task updated successfully", task })
})

//3-delete task 
const deleteTask = catchAsyncErr(async (req, res) => {
    const { taskID } = req.params
    const createdBy = req.user.user._id

    const task = await Task.findOneAndDelete({ _id: taskID, createdBy })
    if (!task) {
        return res.status(404).json({ message: "Task is not found" })
    }
    res.status(200).json({ message: "Task deleted successfully", task })

})

//4-get the user his tasks
const getUserTasks = catchAsyncErr(async (req, res) => {
    const createdBy = req.user.user._id
    const tasks = res.paginatedResults.results.filter(task => task.createdBy.equals(createdBy))
    if (!tasks || tasks.length === 0) {
        return res.status(404).json({ message: "Task is not found" })

    }
    res.json({ message: "success", tasks, pagination: res.paginatedResults.pagination })

})


//5-get task by id
const getTask = catchAsyncErr(async (req, res) => {
    const { taskID } = req.query
    const task = await Task.findById(taskID)
    if (!task) {
        return res.status(404).json({ message: "Task is not found" })
    }

    res.json({ message: "success", task })
})


export {
    createTask,
    updateTask,
    deleteTask,
    getUserTasks,
    getTask
}