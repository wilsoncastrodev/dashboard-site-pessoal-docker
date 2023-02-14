import Joi from "joi";
import { dataValidation, mimeImageValidation, sizeImageValidation } from "../utils/validations.js";

export const sourcesKnowledgeValidation = data => {
    return dataValidation(data, {
        name: Joi.string().required().messages({
            'any.required': 'O campo Nome é obrigatório',
            'string.empty': 'O campo Nome é obrigatório',
            'string.base': 'O campo Nome é inválido',
        }),
        description: Joi.string().required().messages({
            'any.required': 'O campo Descrição é obrigatório',
            'string.empty': 'O campo Descrição é obrigatório',
            'string.base': 'O campo Descrição é inválido',
        }),
        image: Joi.object({
            fieldname: Joi.any().optional(),
            originalname: Joi.any().optional(),
            encoding: Joi.any().optional(),
            mimetype: Joi.any().optional().custom(mimeImageValidation),
            destination: Joi.any().optional(),
            filename: Joi.any().optional(),
            path: Joi.any().optional(),
            size: Joi.any().optional().custom(sizeImageValidation),
        }).required().messages({
            'any.required': 'O campo Imagem é obrigatório',
            'string.empty': 'O campo Imagem é obrigatório',
        }),
        link: Joi.string().uri().required().messages({
            'any.required': 'O campo Link é obrigatório',
            'string.empty': 'O campo Link é obrigatório',
            'string.base': 'O campo Link é inválido',
            'string.uri': 'O campo Link é inválido',
        }),
        profile: Joi.object({
            _id: Joi.string().required().messages({
                'string.base': 'O ID do Perfil é inválido',
                'any.required': 'O ID do Perfil é obrigatório',
                'string.empty': 'O ID do Perfil é obrigatório',
            })
        }),
    });
}
