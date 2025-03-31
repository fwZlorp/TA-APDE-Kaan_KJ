import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/assets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssets(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Fehler beim Laden der Assets");
      }
    };

    fetchAssets();
  }, []);

  if (error)
    return <p className="text-red-500 font-semibold">❌ Fehler: {error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
         Asset-Liste
      </h1>

      {assets.length === 0 ? (
        <p className="text-gray-600">Keine Assets gefunden.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {assets.map((asset) => (
            <div
              key={asset._id}
              className="bg-green-50 p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-300 text-white p-2 rounded-full">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      {asset.name}
                    </h2>
                    <p className="text-sm text-gray-600">{asset.category}</p>
                  </div>
                </div>
                <Link
                  to={`/assets/${asset._id}`}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Details →
                </Link>
              </div>

              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Standort:</strong> {asset.location}
                </p>
                <p>
                  <strong>Status:</strong> {asset.status}
                </p>
                <p>
                  <strong>Preis:</strong>{" "}
                  {asset.price?.toLocaleString()} CHF
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assets;
