import Joi from "joi";
import { dataValidation, mimeImageValidation, sizeImageValidation } from "../utils/validations.js";

export const interestValidation = data => {
    return dataValidation(data, {
        content: Joi.string().required().messages({
            'any.required': 'O campo Conteúdo é obrigatório',
            'string.empty': 'O campo Conteúdo é obrigatório',
            'string.base': 'O campo Conteúdo é inválido',
        }),
        profile: Joi.object({
            _id: Joi.string().required().messages({
                'any.required': 'O ID do Perfil é obrigatório',
                'string.empty': 'O ID do Perfil é obrigatório',
                'string.base': 'O ID do Perfil é inválido',
            })
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
    });
}
