

import Joi from "joi";

export const createSchema = Joi.object({
    name:Joi.string().max(20).min(2).required(),
   

})


export const updateSchema = Joi.object({
    name:Joi.string().max(20).min(2).required(),

})

export const deleteSchema = Joi.object({
    _id:Joi.string().hex().required()

})

