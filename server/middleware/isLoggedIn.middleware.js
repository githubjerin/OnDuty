import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const isLoggedIn = async (req, res, next) => {
    try {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if(token) {
                const payload = jwt.verify(token, process.env.SECRET);
                if(payload) {
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ error: "token verification failed" });
                }
            } else {
                res.status(400).json({ error: "Authorization header malformed" });
            }
        } else {
            res.status(400).json({ error: "Authorization header not present" });
        }
    } catch (error) {
        res.status(400).json({ error });
        next();
    }
}

export default isLoggedIn;