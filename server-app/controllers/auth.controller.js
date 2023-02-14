import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import { createToken } from "../utils/tokens.js"
import { errorMessage, tokenMessage } from "../utils/messages.js"
import { loginValidation, registerValidation } from "../validations/auth.validation.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    const errors = loginValidation(req.body);

    if (errors) {
        return res.status(422).send(errors);
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).send(errorMessage("message", "Endereço de e-mail ou senha incorretos"));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(401).send(errorMessage("message", "Endereço de e-mail ou senha incorretos"));
    }

    const profile = await Profile.findOne({ user: user.id });

    const token = createToken(res, { id: user._id }, process.env.JWT_EXPIRE);

    return res.send(tokenMessage('Usuário Autenticado', { id: user._id, email: user.email, profile: profile }, token));
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = registerValidation(req.body);

    if (errors) {
        return res.status(422).send(errors);
    }

    const verifyUser = await User.findOne({ email });

    if (verifyUser) {
        return res.status(400).send(errorMessage("email", "Usuário já cadastrado"));
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({ email, password: hashPassword });

    const profile = await Profile.create({ user: user._id, name });

    const token = createToken(res, { id: user._id }, process.env.JWT_EXPIRE);

    return res.send(tokenMessage('Usuário Registrado', { id: user._id, email: user.email, profile: profile }, token));
}

const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "prod",
    });

    return res.status(200).send({message: "Usuário deslogado com sucesso"});
}

export default {
    login,
    register,
    logout
}
