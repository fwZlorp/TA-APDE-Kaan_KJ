import React from "react";
import {
  InfoIcon,
  ShieldCheckIcon,
  UsersIcon,
  LightbulbIcon,
  RocketIcon,
  GlobeIcon,
} from "lucide-react";

const Info = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <InfoIcon className="text-green-600" />
        Über uns
      </h1>
      <p className="text-gray-700 mb-8 text-lg max-w-4xl">
        Willkommen bei <span className="font-semibold text-green-700">Mertens Asset Management</span>.
        Unsere Plattform wurde entwickelt, um Unternehmen bei der digitalen Verwaltung ihrer physischen Ressourcen zu unterstützen – sei es IT-Equipment, Maschinen oder allgemeines Inventar.
        Dank smarter Funktionen und einer intuitiven Oberfläche behältst du jederzeit den Überblick über deine Unternehmenswerte.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mb-8">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 shadow-sm">
          <UsersIcon className="text-green-600 mb-3" size={28} />
          <h2 className="text-xl font-semibold mb-2">Unser Team</h2>
          <p className="text-gray-700">
            Ein interdisziplinäres Team aus Entwicklern, UX-Designern und IT-Strateg:innen sorgt dafür,
            dass unsere Plattform innovativ, sicher und zuverlässig bleibt.
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 shadow-sm">
          <ShieldCheckIcon className="text-green-600 mb-3" size={28} />
          <h2 className="text-xl font-semibold mb-2">Vertrauenswürdig & sicher</h2>
          <p className="text-gray-700">
            Datenschutz ist für uns essenziell: Unsere Lösung ist DSGVO-konform, SSL-verschlüsselt und bietet rollenbasierte Zugriffskontrolle.
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 shadow-sm">
          <InfoIcon className="text-green-600 mb-3" size={28} />
          <h2 className="text-xl font-semibold mb-2">Unsere Vision</h2>
          <p className="text-gray-700">
            Wir glauben an einfache, zugängliche und leistungsstarke Tools – für jedes Unternehmen,
            unabhängig von Größe oder Branche.
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 shadow-sm">
          <LightbulbIcon className="text-green-600 mb-3" size={28} />
          <h2 className="text-xl font-semibold mb-2">Innovation im Fokus</h2>
          <p className="text-gray-700">
            Durch kontinuierliche Weiterentwicklung bleiben wir am Puls der Zeit – mit Features wie automatisierten Reports, API-Anbindung und smarten Benachrichtigungen.
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 shadow-sm">
          <RocketIcon className="text-green-600 mb-3" size={28} />
          <h2 className="text-xl font-semibold mb-2">Schnell einsatzbereit</h2>
          <p className="text-gray-700">
            Die Installation und Inbetriebnahme erfolgen unkompliziert. Innerhalb weniger Minuten bist du bereit, dein Asset-Management zu optimieren.
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 shadow-sm">
          <GlobeIcon className="text-green-600 mb-3" size={28} />
          <h2 className="text-xl font-semibold mb-2">Nachhaltigkeit</h2>
          <p className="text-gray-700">
            Wir setzen auf langlebige Software, nachhaltige Infrastruktur und energieeffiziente Technologien – für eine bessere Zukunft.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
