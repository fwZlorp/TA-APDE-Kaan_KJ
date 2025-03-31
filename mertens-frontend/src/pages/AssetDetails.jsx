import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, Info, Tag, MapPin, User, Settings, CalendarDays, DollarSign } from "lucide-react";

const AssetDetails = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/assets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAsset(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchAsset();
  }, [id]);

  const deleteAsset = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/assets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Asset gelöscht");
      navigate("/assets");
    } catch (err) {
      alert("Löschen fehlgeschlagen");
    }
  };

  if (error)
    return (
      <p className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded mt-10 max-w-2xl mx-auto">
        Fehler: {error}
      </p>
    );

  if (!asset)
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">Lädt Asset-Daten...</p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-green-50 border border-green-200 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-green-900">
        <Info className="w-7 h-7 text-green-700" />
        Asset-Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-gray-800 text-base">
        <div>
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <Tag className="w-4 h-4" /> Name:
          </div>
          <p>{asset.name}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <Settings className="w-4 h-4" /> Typ:
          </div>
          <p>{asset.category}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <MapPin className="w-4 h-4" /> Standort:
          </div>
          <p>{asset.location}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <User className="w-4 h-4" /> Zugewiesen an:
          </div>
          <p>{asset.assignedTo}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <Settings className="w-4 h-4" /> Status:
          </div>
          <p>{asset.status}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <DollarSign className="w-4 h-4" /> Preis:
          </div>
          <p>{parseFloat(asset.price).toLocaleString("de-CH")} CHF</p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <CalendarDays className="w-4 h-4" /> Kaufdatum:
          </div>
          <p>{new Date(asset.purchaseDate).toLocaleDateString("de-CH")}</p>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={deleteAsset}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow inline-flex items-center gap-2 transition duration-200"
        >
          <Trash2 className="w-5 h-5" /> Asset löschen
        </button>
      </div>
    </div>
  );
};

export default AssetDetails;
