import Joi from "joi";

export const dataValidation = (data, schema) => {
    schema = Joi.object().keys(schema).unknown(true);

    let { error } = schema.validate(data, { abortEarly: false });

    if (!error) {
        return null;
    }

    let errorMessages = {};

    for (let err of error.details) {
        errorMessages[err.context.label] = err.message;
    }

    return errorMessages;
}

export const objectIdValidation = (_id) => {
    let schema = {
        _id: Joi.objectId().required(),
    };

    return validateData(schema, _id);
}

export const limitValitation = (limit) => {
    let schema = {
        limit: Joi.number().required(),
    };

    return validateData(schema, limit);
}

export const passwordValidation = (value, helpers) => {
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message('A Senha deve conter pelo menos uma letra e um número');
    }

    return value;
};

export const sizeImageValidation = (value, helpers) => {
    if (value >= 1000000) {
        return helpers.message('O tamanho da imagem deve ser menor do que 1mb');
    }

    return value;
};

export const mimeImageValidation = (value, helpers) => {
    if (value !== 'image/jpeg' && value !== 'image/jpg' && value !== 'image/png' && value !== 'image/svg+xml') {
        return helpers.message('Formato de imagem inválido. Você só pode fazer upload do arquivo JPG, JPEG, PNG ou SVG');
    }

    return value;
};

export const sizeFileValidation = (value, helpers) => {
    if (value >= 1000000) {
        return helpers.message('O tamanho da imagem deve ser menor do que 1mb');
    }

    return value;
};

export const mimeFileValidation = (value, helpers) => {
    if (value !== 'application/pdf') {
        return helpers.message('Formato de aquivo inválido. Você só pode fazer upload do arquivo em PDF');
    }

    return value;
};

