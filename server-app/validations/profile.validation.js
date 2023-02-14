import Joi from "joi";
import { dataValidation, sizeFileValidation, mimeFileValidation } from "../utils/validations.js";

export const updateProfileValidation = data => {
    return dataValidation(data, {
        name: Joi.string().required().messages({
            'any.required': 'O campo Nome é obrigatório',
            'string.empty': 'O campo Nome é obrigatório',
            'string.base': 'O campo Nome é inválido',
        }),
        profession: Joi.string().required().messages({
            'any.required': 'O campo Profissão é obrigatório',
            'string.empty': 'O campo Profissão é obrigatório',
            'string.base': 'O campo Profissão é inválido',
        }),
        aboutMe: Joi.string().required().messages({
            'any.required': 'O campo Sobre Mim é obrigatório',
            'string.empty': 'O campo Sobre Mim é obrigatório',
            'string.base': 'O campo Sobre Mim é inválido',
        }),
        characteristic: Joi.array().min(1).max(7).items(Joi.string().messages({
            'string.base': 'O campo Caracteristica é inválido',
        })).required().messages({
            'array.min': 'Adicione pelo menos 1 característica',
            'array.max': 'Só é permitido adicionar 7 características ao perfil',
        }),
        contacts: Joi.object({
            website: Joi.string().uri().required().messages({
                'any.required': 'O campo Website é obrigatório',
                'string.empty': 'O campo Website é obrigatório',
                'string.base': 'O campo Website é inválido',
                'string.uri': 'O campo Website é inválido'
            }),
            phone: Joi.string().required().messages({
                'any.required': 'O campo Celular é obrigatório',
                'string.empty': 'O campo Celular é obrigatório',
                'string.base': 'O campo Celular é inválido',
            }),
            location: Joi.string().required().messages({
                'any.required': 'O campo Localização é obrigatório',
                'string.empty': 'O campo Localização é obrigatório',
                'string.base': 'O campo Localização é inválido',
            })
        }),
        social: Joi.object({
            github: Joi.string().messages({
                'any.required': 'O campo Github é obrigatório',
                'string.empty': 'O campo Github é obrigatório',
                'string.base': 'O campo Github é inválido',
            }),
            linkedin: Joi.string().messages({
                'any.required': 'O campo Linkedin é obrigatório',
                'string.empty': 'O campo Linkedin é obrigatório',
                'string.base': 'O campo Linkedin é inválido',
            })
        }),
        cv: Joi.object({
            fieldname: Joi.any().optional(),
            originalname: Joi.any().optional(),
            encoding: Joi.any().optional(),
            mimetype: Joi.any().optional().custom(mimeFileValidation),
            destination: Joi.any().optional(),
            filename: Joi.any().optional(),
            path: Joi.any().optional(),
            size: Joi.any().optional().custom(sizeFileValidation),
        }).required().messages({
            'any.required': 'O campo Currículo é obrigatório',
            'string.empty': 'O campo Currículo é obrigatório',
        }),
    });
}
