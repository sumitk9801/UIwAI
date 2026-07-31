import jwt from "jsonwebtoken";

const getJwtSecret = () => {
    const jwtSecret = process.env.JWT_SECRET?.trim();
    if (!jwtSecret) {
        throw new Error("Missing JWT_SECRET environment variable");
    }
    return jwtSecret;
};

export const generateToken = (userId) => {
    try {
        const token = jwt.sign({ userId }, getJwtSecret(), { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};