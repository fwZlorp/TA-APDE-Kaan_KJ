import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Kein Token, Zugriff verweigert" });
    }

    // 🔥 Falls "Bearer " im Token ist, entfernen
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Ungültiges Token" });
    }
};

export default authMiddleware;
