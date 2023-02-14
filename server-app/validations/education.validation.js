import Joi from "joi";
import { dataValidation } from "../utils/validations.js";

export const educationValidation = data => {
    return dataValidation(data, {
        institution: Joi.string().required().messages({
            'any.required': 'O campo Nome da Instituição é obrigatório',
            'string.empty': 'O campo Nome da Instituição é obrigatório',
            'string.base': 'O campo Nome da Instituição é inválido',
        }),
        degree: Joi.string().required().messages({
            'any.required': 'O campo Grau de Ensino é obrigatório',
            'string.empty': 'O campo Grau de Ensino é obrigatório',
            'string.base': 'O campo Grau de Ensino é inválido',
        }),
        specialization: Joi.string().required().messages({
            'any.required': 'O campo Curso é obrigatório',
            'string.empty': 'O campo Curso é obrigatório',
            'string.base': 'O campo Curso é inválido',
        }),
        from: Joi.date().required().messages({
            'any.required': 'O campo Data de Início é obrigatório',
            'date.empty': 'O campo Data de Início é obrigatório',
            'date.base': 'O campo Data de Início é inválido',
        }),
        to: Joi.date().allow(null).allow('').messages({
            'date.base': 'O campo Data de Termino é inválido',
        }),
        current: Joi.boolean().messages({
            'boolean.base': 'O campo é inválido',
        }),
        description: Joi.string().required().messages({
            'any.required': 'O campo Descrição é obrigatório',
            'string.empty': 'O campo Descrição é obrigatório',
            'string.base': 'O campo Descrição é inválido',
        }),
        status: Joi.string().required().valid('Superior Completo', 'Superior Incompleto').messages({
            'any.required': 'O campo Status é obrigatório',
            'string.empty': 'O campo Status é obrigatório',
            'string.base': 'O campo Status é inválido',
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
