import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import AssetDetails from "./pages/AssetDetails";
import AddAsset from "./pages/AddAsset";
import Reports from "./pages/Reports";
import Info from "./pages/Info"; // Neue Info-Seite
import Login from "./pages/Login";
import Logout from "./pages/Logout";

const isLoggedIn = () => !!sessionStorage.getItem("token");

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

const AppWrapper = () => {
  const location = useLocation();
  const loggedIn = isLoggedIn();

  return (
    <div className="flex h-screen w-screen">
      {loggedIn && location.pathname !== "/login" && <Sidebar />}
      <div className={`flex-1 p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen ${loggedIn ? "ml-64" : ""}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<ProtectedRoute><Navigate to="/dashboard" /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/assets" element={<ProtectedRoute><Assets /></ProtectedRoute>} />
          <Route path="/assets/:id" element={<ProtectedRoute><AssetDetails /></ProtectedRoute>} />
          <Route path="/assets/add" element={<ProtectedRoute><AddAsset /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/info" element={<ProtectedRoute><Info /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
