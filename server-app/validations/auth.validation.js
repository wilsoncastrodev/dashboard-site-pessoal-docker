import Joi from "joi";
import { dataValidation, passwordValidation } from "../utils/validations.js";

export const loginValidation = data => {
    return dataValidation(data, {
        email: Joi.string().required().email().messages({
            'any.required': 'O E-mail é obrigatório',
            'string.empty': 'O E-mail é obrigatório',
            'string.base': 'O E-mail ou Senha inválidos',
            'string.email': 'O E-mail ou Senha inválidos',
        }),
        password: Joi.string().required().messages({
            'any.required': 'A Senha é obrigatória',
            'string.empty': 'A Senha é obrigatória',
            'string.base': 'O E-mail ou Senha inválidos',
        }),
    });
}

export const registerValidation = data => {
    return dataValidation(data, {
        name: Joi.string().required().messages({
            'any.required': 'O Nome é obrigatório',
            'string.empty': 'O Nome é obrigatório',
            'string.base': 'O Nome é inválido',
        }),
        email: Joi.string().required().email().messages({
            'any.required': 'O E-mail é obrigatório',
            'string.empty': 'O E-mail é obrigatório',
            'string.base': 'O E-mail é inválido',
            'string.email': 'O E-mail é inválido',
        }),
        password: Joi.string().required().min(8).custom(passwordValidation).messages({
            'any.required': 'A Senha é obrigatória',
            'string.empty': 'A Senha é obrigatória',
            'string.base': 'A Senha deve conter pelo menos uma letra e um número',
            'string.min': 'A senha precisa ter mais de 8 caracteres'
        }),
    });
}
