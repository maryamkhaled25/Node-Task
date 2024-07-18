
import Joi from "joi";

export const signUpSchema = Joi.object({
    name:Joi.string().max(20).min(2).required(),
    email: Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/).required()

})

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/).required()

})

