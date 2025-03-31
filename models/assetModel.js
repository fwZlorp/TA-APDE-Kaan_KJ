import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: [
      "Elektronik",
      "Bürogerät",
      "Maschine",
      "IT-Infrastruktur",
      "Peripherie",
      "Mobile Gerät",
    ],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["In Betrieb", "Defekt", "Wartung"],
    default: "In Betrieb",
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  purchaseDate: {
    type: Date,
  },
});

const Asset = mongoose.model("Asset", assetSchema);
export default Asset;
