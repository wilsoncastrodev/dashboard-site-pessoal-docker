import jwt from "jsonwebtoken";

export const createToken = (res, data, expire = '1d') => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: expire });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "prod",
    });

    return token;
}

export const verifyToken = token => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
};


