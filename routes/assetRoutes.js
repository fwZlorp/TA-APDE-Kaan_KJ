import express from "express";
import { 
    getAssets, 
    getAssetById, 
    createAsset, 
    updateAsset, 
    deleteAsset, 
    getApiStatus 
} from "../controllers/assetController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();

// ✅ Route für alle Assets abrufen
router.get("/", authMiddleware, getAssets);

// ✅ Route für ein einzelnes Asset nach ID abrufen
router.get("/:id", authMiddleware, getAssetById);

// ✅ Route zum Erstellen eines neuen Assets
router.post("/", authMiddleware, createAsset);

// ✅ Route zum Aktualisieren eines bestehenden Assets
router.put("/:id", authMiddleware, updateAsset);

// ✅ Route zum Löschen eines Assets
router.delete("/:id", authMiddleware, deleteAsset);

// ✅ Route für API-Status-Check (ohne Authentifizierung)
router.get("/status", getApiStatus);

export default router;
