import Joi from "joi";
import { dataValidation } from "../utils/validations.js";

export const messageValidation = data => {
    return dataValidation(data, {
        name: Joi.string().required().messages({
            'any.required': 'O campo Nome é obrigatório',
            'string.empty': 'O campo Nome é obrigatório',
            'string.base': 'O campo Nome é inválido',
        }),
        email: Joi.string().required().messages({
            'any.required': 'O campo E-mail é obrigatório',
            'string.empty': 'O campo E-mail é obrigatório',
            'string.base': 'O campo E-mail é inválido',
        }),
        phone: Joi.string().required().messages({
            'any.required': 'O campo Celular é obrigatório',
            'string.empty': 'O campo Celular é obrigatório',
            'string.base': 'O campo Celular é inválido',
        }),
        content: Joi.string().messages({
            'any.required': 'O campo Mensagem é obrigatório',
            'string.empty': 'O campo Mensagem é obrigatório',
            'string.base': 'O campo Mensagem é inválido',
        })
    });
}
