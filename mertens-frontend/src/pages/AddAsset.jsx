import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAsset = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    assignedTo: "",
    status: "In Betrieb",
    price: "",
    purchaseDate: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    try {
      await axios.post("http://localhost:3000/api/assets", formData, {


        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/assets");
    } catch (err) {
      console.error("Fehler beim Senden des Assets:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Fehler beim Erstellen des Assets");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <span className="text-purple-500"></span> Neues Asset hinzufügen
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-4 font-semibold">❌ {error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Asset-Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        >
          <option value="">Kategorie wählen</option>
          <option value="Elektronik">Elektronik</option>
          <option value="Möbel">Möbel</option>
          <option value="IT-Infrastruktur">IT-Infrastruktur</option>
          <option value="Fahrzeug">Fahrzeug</option>
          <option value="Peripherie">Peripherie</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Standort"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <input
          type="text"
          name="assignedTo"
          placeholder="Zugewiesen an"
          value={formData.assignedTo}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        >
          <option value="In Betrieb">In Betrieb</option>
          <option value="Wartung">Wartung</option>
          <option value="Ausgemustert">Ausgemustert</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Preis"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-md hover:bg-green-600 transition"
        >
          ✅ Erstellen
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
