import Joi from "joi";
import { createComment } from "../../interface.js";


export const commentValidation = Joi.object<createComment>({
    userId: Joi.number().required(),
    postId: Joi.number().required(),
    comment: Joi.string().min(3).required()
})

export const updateCommentValidation = Joi.object({
    comment: Joi.string().min(3).required()
})