import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery";

export default function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <BrowserRouter>
      <nav className="bg-white shadow-md p-4 flex gap-4 justify-center fixed top-0 w-full z-10">
        {!user ? (
          <>
            <Link to="/login" className="text-blue-600 font-semibold">Belépés</Link>
            <Link to="/register" className="text-blue-600 font-semibold">Regisztráció</Link>
          </>
        ) : (
          <>
            <Link to="/" className="text-blue-600 font-semibold">Főoldal</Link>
            <Link to="/gallery" className="text-blue-600 font-semibold">Galéria</Link>
            <Link to="/upload" className="text-blue-600 font-semibold">Feltöltés</Link>
            <button
              onClick={() => {
                localStorage.removeItem("loggedInUser");
                setUser(null);
              }}
              className="text-red-500 font-semibold"
            >
              Kilépés
            </button>
          </>
        )}
      </nav>

      <div className="pt-20">
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login onLogin={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
