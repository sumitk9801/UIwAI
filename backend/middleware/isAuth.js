import jwt from "jsonwebtoken";

const getAuthToken = (req) => {
    const tokenFromCookie = req.cookies?.token;
    const authHeader = req.headers?.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    return tokenFromCookie || tokenFromHeader;
};

const isAuth = (req, res, next) => {
    try {
        const token = getAuthToken(req);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const secret = process.env.JWT_SECRET?.trim();
        if (!secret) {
            console.error("JWT secret is not configured");
            return res.status(500).json({ message: "Internal Server Error" });
        }

        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error("Auth middleware error:", err.message);
        if (err.name === "TokenExpiredError") {
            res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
            return res.status(401).json({ message: "Token expired" });
        }
        if (err.name === "JsonWebTokenError") {
            res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
            return res.status(401).json({ message: "Invalid token" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default isAuth;