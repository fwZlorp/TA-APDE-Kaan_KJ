import mongoose from "mongoose";
import Asset from "../models/assetModel.js";

/**
 * GET: Alle Assets abrufen
 */
export const getAssets = async (req, res) => {
    try {
        console.log("📡 GET /api/assets → Alle Assets abrufen");
        const assets = await Asset.find();
        res.json(assets);
    } catch (error) {
        console.error("❌ Fehler in getAssets:", error);
        res.status(500).json({ message: "Fehler beim Abrufen der Assets", error: error.message });
    }
};

/**
 * GET: Ein einzelnes Asset abrufen
 */
export const getAssetById = async (req, res) => {
    try {
        console.log("🔍 GET /api/assets/:id mit ID:", req.params.id);

        // 🔥 Prüfen, ob die ID gültig ist
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.warn("❌ Ungültige Asset-ID:", req.params.id);
            return res.status(400).json({ message: "Ungültige Asset-ID" });
        }

        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            console.warn("❌ Asset nicht gefunden:", req.params.id);
            return res.status(404).json({ message: "Asset nicht gefunden" });
        }

        console.log("✅ Gefundenes Asset:", asset);
        res.json(asset);
    } catch (error) {
        console.error("❌ Fehler in getAssetById:", error);
        res.status(500).json({ message: "Fehler beim Abrufen des Assets", error: error.message });
    }
};

/**
 * POST: Neues Asset erstellen
 */
export const createAsset = async (req, res) => {
    try {
        console.log("🆕 POST /api/assets → Neues Asset erstellen", req.body);
        const newAsset = new Asset(req.body);
        await newAsset.save();
        console.log("✅ Asset erfolgreich erstellt:", newAsset);
        res.status(201).json(newAsset);
    } catch (error) {
        console.error("❌ Fehler in createAsset:", error);
        res.status(400).json({ message: "Fehler beim Erstellen des Assets", error: error.message });
    }
};

/**
 * PUT: Ein Asset aktualisieren
 */
export const updateAsset = async (req, res) => {
    try {
        console.log("🔄 PUT /api/assets/:id mit ID:", req.params.id);
        console.log("📦 Neue Daten:", req.body);

        // 🔥 Prüfen, ob die ID gültig ist
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.warn("❌ Ungültige Asset-ID:", req.params.id);
            return res.status(400).json({ message: "Ungültige Asset-ID" });
        }

        const updatedAsset = await Asset.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // ✅ Validierung erzwingen
        );

        if (!updatedAsset) {
            console.warn("❌ Asset nicht gefunden:", req.params.id);
            return res.status(404).json({ message: "Asset nicht gefunden" });
        }

        console.log("✅ Asset erfolgreich aktualisiert:", updatedAsset);
        res.json(updatedAsset);
    } catch (error) {
        console.error("❌ Fehler in updateAsset:", error);
        res.status(400).json({ message: "Fehler beim Aktualisieren des Assets", error: error.message });
    }
};

/**
 * DELETE: Ein Asset löschen
 */
export const deleteAsset = async (req, res) => {
    try {
        console.log("🗑️ DELETE /api/assets/:id mit ID:", req.params.id);

        // 🔥 Prüfen, ob die ID gültig ist
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.warn("❌ Ungültige Asset-ID:", req.params.id);
            return res.status(400).json({ message: "Ungültige Asset-ID" });
        }

        const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
        if (!deletedAsset) {
            console.warn("❌ Asset nicht gefunden:", req.params.id);
            return res.status(404).json({ message: "Asset nicht gefunden" });
        }

        console.log("✅ Asset erfolgreich gelöscht:", deletedAsset);
        res.json({ message: "Asset erfolgreich gelöscht", deletedAsset });
    } catch (error) {
        console.error("❌ Fehler in deleteAsset:", error);
        res.status(500).json({ message: "Fehler beim Löschen des Assets", error: error.message });
    }
};

/**
 * GET: API-Status prüfen
 */
export const getApiStatus = (req, res) => {
    console.log("🛠️ API-Status abgefragt");
    res.json({ message: "API läuft einwandfrei" });
};
