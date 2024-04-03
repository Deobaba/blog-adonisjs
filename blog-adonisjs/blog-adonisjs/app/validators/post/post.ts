import Joi from "joi";
import { createPost } from "../../interface.js";


export const postValidation = Joi.object<createPost>({
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(3).required(),
    isPublished: Joi.boolean().required(),
    userId: Joi.number().required()
})

export const updatePostValidation = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(3).required(),
    isPublished: Joi.boolean().required()
})

export const publishPostValidation = Joi.object({
    isPublished: Joi.boolean().required()
})