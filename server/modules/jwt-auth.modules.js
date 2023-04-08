import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const maxAge = 1 * 24 * 60 * 60;

export function createToken(payload) {
    const token = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: maxAge }
    );

    return token;
}

export async function comparePassword(pass, original) {
    const auth = await bcrypt.compare(pass, original);
    return auth;
}