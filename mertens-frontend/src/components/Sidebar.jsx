import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  FileText,
  PlusCircle,
  Info,
  LogOut,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

const Sidebar = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAssetsOpen, setIsAssetsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const isLoggedIn = !!sessionStorage.getItem("token");
  if (!isLoggedIn) return null;

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchInput.toLowerCase();
      if (query.includes("dashboard")) navigate("/dashboard");
      else if (query.includes("liste")) navigate("/assets");
      else if (query.includes("hinzufügen")) navigate("/assets/add");
      else if (query.includes("info")) navigate("/info");

      setSearchInput("");
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 text-black dark:text-white border-r border-gray-200">
      {/* Header */}
      <div className="bg-greenPrimary dark:bg-greenPrimary p-5">
        <h1 className="text-xl font-bold leading-tight">
          Mertens Asset <br /> Management
        </h1>
      </div>

      {/* Suche */}
      <div className="p-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Suche"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-black dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>

        {/* Navigation */}
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 p-2 rounded-md ${
                location.pathname === "/dashboard"
                  ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </li>

          {/* Assets Dropdown */}
          <li>
            <button
              onClick={() => setIsAssetsOpen(!isAssetsOpen)}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                Assets
              </span>
              {isAssetsOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {isAssetsOpen && (
              <ul className="ml-6 mt-2 space-y-1 text-sm">
                <li>
                  <Link
                    to="/assets"
                    className={`flex items-center gap-2 p-2 rounded-md ${
                      location.pathname === "/assets"
                        ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Asset-Liste
                  </Link>
                </li>
                <li>
                  <Link
                    to="/assets/add"
                    className={`flex items-center gap-2 p-2 rounded-md ${
                      location.pathname === "/assets/add"
                        ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <PlusCircle className="w-4 h-4" />
                    Assets hinzufügen
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/info"
              className={`flex items-center gap-2 p-2 rounded-md ${
                location.pathname === "/info"
                  ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Info className="w-4 h-4" />
              Info
            </Link>
          </li>

          <li>
            <Link
              to="/logout"
              className="flex items-center gap-2 p-2 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-800"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
