import express from 'express'
import { auth } from '../../middleware/authuntication.js'
import { validation } from '../../middleware/validation.js'
import * as taskController from './task.controller.js'
import { createSchema, deleteSchema, updateSchema } from './task.validation.js'
import { Task } from '../../../databases/models/task.model.js'


const taskRouter = express.Router()


taskRouter.post('/createTask',auth,validation(createSchema),taskController.createTask)

taskRouter.put('/updateTask',auth,validation(updateSchema),taskController.updateTask)

taskRouter.delete('/deleteTask',auth,validation(deleteSchema),taskController.deleteTask)

taskRouter.get('/getUserTasks',paginateAndFilter(Task),taskController.getUserTasks)

taskRouter.get('/getTask',taskController.getTask)

export default taskRouter

