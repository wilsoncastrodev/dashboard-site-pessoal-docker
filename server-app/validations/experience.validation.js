import Joi from "joi";
import { dataValidation } from "../utils/validations.js";

export const experienceValidation = data => {
    return dataValidation(data, {
        position: Joi.string().required().messages({
            'any.required': 'O campo Cargo é obrigatório',
            'string.empty': 'O campo Cargo é obrigatório',
            'string.base': 'O campo Cargo é inválido',
        }),
        company: Joi.string().required().messages({
            'any.required': 'O campo Empresa é obrigatório',
            'string.empty': 'O campo Empresa é obrigatório',
            'string.base': 'O campo Empresa é inválido',
        }),
        from: Joi.date().required().messages({
            'any.required': 'O campo Data de Início é obrigatório',
            'date.empty': 'O campo Data de Início é obrigatório',
            'date.base': 'O campo Data de Início é inválido',
        }),
        to: Joi.date().messages({
            'date.base': 'O campo Data de Saída é inválido',
        }),
        current: Joi.boolean().messages({
            'boolean.base': 'O campo é inválido',
        }),
        description: Joi.string().required().messages({
            'any.required': 'O campo Descrição é obrigatório',
            'string.empty': 'O campo Descrição é obrigatório',
            'string.base': 'O campo Descrição é inválido',
        }),
        technologies: Joi.array().items(Joi.string().messages({
            'any.required': 'O campo Tecnologia é obrigatório',
            'string.empty': 'O campo Tecnologia é obrigatório',
            'string.base': 'O campo Tecnologia é inválido',
        })),
        profile: Joi.object({
            _id: Joi.string().required().messages({
                'string.base': 'O ID do Perfil é inválido',
                'any.required': 'O ID do Perfil é obrigatório',
                'string.empty': 'O ID do Perfil é obrigatório',
            })
        })
    });
}
