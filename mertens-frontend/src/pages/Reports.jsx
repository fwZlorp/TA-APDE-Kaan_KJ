import React from "react";

const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Statistiken & Berichte</h1>

      {/* Statistiken */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-gray-800">
          <h2 className="text-lg font-semibold">📦 Gesamtanzahl Assets</h2>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-gray-800">
          <h2 className="text-lg font-semibold">✅ Aktive Assets</h2>
          <p className="text-2xl font-bold mt-2">98</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-gray-800">
          <h2 className="text-lg font-semibold">🔧 Assets in Wartung</h2>
          <p className="text-2xl font-bold mt-2">22</p>
        </div>
      </div>

      {/* Platz für Diagramme */}
      <h2 className="text-xl font-semibold mt-8 mb-4">📊 Asset-Nutzung</h2>
      <div className="bg-gray-200 p-6 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">[Hier könnte ein Diagramm sein]</p>
      </div>

      {/* Export Buttons */}
      <h2 className="text-xl font-semibold mt-8 mb-4">📥 Berichte exportieren</h2>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          📄 Als PDF exportieren
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          📊 Als CSV exportieren
        </button>
      </div>
    </div>
  );
};

export default Reports;
