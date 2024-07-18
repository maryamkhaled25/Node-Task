import Joi from "joi";

export const createSchema = Joi.object({
    title:Joi.string().max(50).min(2).required(),
    

})


export const updateSchema = Joi.object({
    _id:Joi.string().hex().required(),
   

})

export const deleteSchema = Joi.object({
    _id:Joi.string().hex().required()

})