import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Registrierung eines neuen Benutzers
 */
export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Benutzername und Passwort sind erforderlich" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Benutzername existiert bereits" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Benutzer erfolgreich registriert" });
    } catch (error) {
        res.status(500).json({ message: "Fehler bei der Registrierung", error: error.message });
    }
};

/**
 * Benutzer-Login
 */
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Benutzer nicht gefunden" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Falsches Passwort" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login erfolgreich", token });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Login", error: error.message });
    }
};
