import express from 'express'

import { validation } from '../../middleware/validation.js'

import * as userController from './user.controller.js'
import {  signInSchema, signUpSchema } from './user.validation.js'

const userRouter = express.Router()

//====================signUp(add) =============================================
userRouter.post('/signup',validation(signUpSchema),userController.signup)

//====================signIn ===================================================
userRouter.post('/signin',validation(signInSchema),userController.signin)

//====================verify ==================================================
userRouter.get('/verify/:token',userController.verify)





export default userRouter

