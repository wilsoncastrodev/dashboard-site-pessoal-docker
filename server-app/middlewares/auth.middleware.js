import { verifyToken } from "../utils/tokens.js"
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!(authorization && authorization.startsWith('Bearer'))) {
        return res.status(401).send({ message: "Token de autenticação inválido" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: "Não há token, autorização não permitada" });
    }

    const decoded = await verifyToken(token);

    if (!decoded) {
        return res.status(401).send({ message: "Token expirado" });
    }

    const user = await User.findById(decoded.data.id).select("-password");

    if (!user) {
        return res.status(401).send({ message: "Usuário do token não foi encontrado" });
    }

    next();
};

export default auth
