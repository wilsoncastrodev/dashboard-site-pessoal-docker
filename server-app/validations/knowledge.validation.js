import Joi from "joi";
import { dataValidation } from "../utils/validations.js";

export const knowledgeValidation = data => {
    return dataValidation(data, {
        name: Joi.string().required().messages({
            'any.required': 'O campo Nome é obrigatório',
            'string.empty': 'O campo Nome é obrigatório',
            'string.base': 'O campo Nome é inválido',
        }),
        categoryKnowledge: Joi.string().required().messages({
            'any.required': 'O campo Categoria é obrigatório',
            'string.empty': 'O campo Categoria é obrigatório',
            'string.base': 'O campo Categoria é inválido',
        }),
        profile: Joi.object({
            _id: Joi.string().required().messages({
                'string.base': 'O ID do Perfil é inválido',
                'any.required': 'O ID do Perfil é obrigatório',
                'string.empty': 'O ID do Perfil é obrigatório',
            })
        })
    });
}
