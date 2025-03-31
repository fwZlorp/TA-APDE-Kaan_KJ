import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import assetRoutes from "./routes/assetRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Datenbankverbindung herstellen
connectDB();

// 🔹 CORS richtig konfigurieren (Frontend darf auf Backend zugreifen)
app.use(cors({
    origin: "http://localhost:5173",  // Erlaubt Anfragen vom Frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true  // Falls Login-Sessions verwendet werden
}));

// 🔹 Middleware für JSON-Parsing
app.use(express.json({ type: "application/json", limit: "10mb" }));

// 🔹 Statische Dateien bereitstellen (z. B. HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Debugging: Zeigt alle registrierten Routen in der Konsole an
console.log("📌 Registrierte Routen:");
setTimeout(() => {
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            console.log(`🔹 ${Object.keys(r.route.methods).join(",").toUpperCase()} ${r.route.path}`);
        }
    });
}, 1000);  // Verzögerung, um sicherzustellen, dass alles geladen wurde

// 🔹 Health-Check Route
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 🔹 API-Routen für Assets und Benutzer
app.use("/api/assets", assetRoutes);
app.use("/api/users", userRoutes);

// 🔹 Route für die Startseite (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔹 Error Handling Middleware (Falls eine Route nicht existiert)
app.use((req, res, next) => {
    res.status(404).json({ error: "Route nicht gefunden" });
});

// 🔹 Globaler Fehler-Handler (Falls ein Fehler auftritt)
app.use((err, req, res, next) => {
    console.error("❌ Server-Fehler:", err);
    res.status(500).json({ error: "Interner Serverfehler", details: err.message });
});

// 🔹 Server starten
app.listen(PORT, () => console.log(`✅ Server läuft auf http://localhost:${PORT}`));
