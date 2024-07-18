import express from 'express'
import * as categoryController from './category.controller.js'
import { auth } from '../../middleware/authuntication.js'
import { Category } from '../../../databases/models/category.model.js'
import { validation } from '../../middleware/validation.js'
import { createSchema, deleteSchema, updateSchema } from './category.validation.js'


const categoryRouter = express.Router()

categoryRouter.get('/getCategory/specific',auth,categoryController.getCategory)

categoryRouter.get('/getAllCategories',auth,paginateAndFilter(Category),categoryController.getAllCategories)

categoryRouter.post('/create',auth,validation(createSchema),categoryController.createCategory)

categoryRouter.put('/updatePost',auth,validation(updateSchema),categoryController.updateCategory)

categoryRouter.delete('/deletePost',auth,validation(deleteSchema),categoryController.deleteCategory)


export default categoryRouter