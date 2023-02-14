import Joi from "joi";
import { dataValidation } from "../utils/validations.js";

export const categorySkillValidation = data => {
    return dataValidation(data, {
        name: Joi.string().required().messages({
            'any.required': 'O campo Nome da Categoria é obrigatório',
            'string.empty': 'O campo Nome da Categoria é obrigatório',
            'string.base': 'O campo Nome da Categoria é inválido',
        }),
    });
}
