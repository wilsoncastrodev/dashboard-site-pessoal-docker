import {Schema, model} from "mongoose";
import validator from "validator";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'O campo e-mail é obrigatório'],
        trim: true,
        validate: [validator.isEmail, 'O endereço de e- mail fornecido é inválido.'],
    },
    password: {
        type: String,
        required: [true, 'O campo senha é obrigatório'],
        trim: true,
    },
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

export default model('User', UserSchema);
