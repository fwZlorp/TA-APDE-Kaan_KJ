import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Coins,
  Home,
  ShieldCheck,
  TrendingUp,
  Info,
  Leaf,
} from "lucide-react";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/assets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssets(res.data);
      } catch (err) {
        console.error("Fehler beim Laden der Assets", err);
      }
    };

    fetchAssets();
  }, []);

  const totalPrice = assets.reduce((sum, asset) => sum + (asset.price || 0), 0);

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Home className="w-7 h-7 text-green-600" />
          Dashboard
        </h1>
        <p className="text-gray-700 max-w-4xl text-lg">
          Willkommen im <strong>Mertens Asset Management System</strong>. Behalte den Überblick über
          deine Unternehmenswerte – inklusive Inventar, Standorte und aktuellen Status. Dieses
          Dashboard liefert dir auf einen Blick die wichtigsten Kennzahlen.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-100 p-6 rounded-xl shadow-md flex items-center gap-4">
          <div className="bg-green-300 text-white p-3 rounded-full">
            <Briefcase />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Anzahl der Assets</h2>
            <p className="text-3xl font-bold text-black">{assets.length}</p>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow-md flex items-center gap-4">
          <div className="bg-green-300 text-white p-3 rounded-full">
            <Coins />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Totalpreis</h2>
            <p className="text-3xl font-bold text-black">
              {totalPrice.toLocaleString()} CHF
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex gap-4 items-start">
          <Info className="text-green-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800">Was ist das?</h3>
            <p className="text-sm text-gray-600">
              Unser System verwaltet und analysiert physische Assets im Unternehmen – egal ob Hardware,
              Infrastruktur oder Equipment.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex gap-4 items-start">
          <ShieldCheck className="text-green-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800">Sicher & aktuell</h3>
            <p className="text-sm text-gray-600">
              Daten werden geschützt gespeichert und laufend mit deinem Backend synchronisiert –
              keine veralteten Listen mehr.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex gap-4 items-start">
          <TrendingUp className="text-green-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800">Wachstum fördern</h3>
            <p className="text-sm text-gray-600">
              Entscheidungen auf Basis von Daten: Erkenne Trends und investiere effizient in dein Inventar.
            </p>
          </div>
        </div>
      </div>

      {/* Sustainability Goals */}
      <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-md mt-10 flex items-start gap-4">
        <Leaf className="text-green-600 w-6 h-6 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-1">Unsere Nachhaltigkeitsziele</h3>
          <p className="text-sm text-gray-700">
            Wir setzen auf Nachhaltigkeit und Langlebigkeit. Unsere Prozesse sind darauf ausgelegt, den
            ökologischen Fussabdruck zu minimieren – durch energieeffiziente Geräte, verlängerte Lebenszyklen
            und bewusstes Ressourcenmanagement. Gemeinsam gestalten wir eine grünere Zukunft.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
