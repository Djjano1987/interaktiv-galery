import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const admin = {
      email: "k.janika87@gmail.com",
      password: "janikajano",
      role: "admin"
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found =
      (email === admin.email && password === admin.password)
        ? admin
        : users.find(u => u.email === email && u.password === password);

    if (found) {
      localStorage.setItem("loggedInUser", JSON.stringify(found));
      if (onLogin) onLogin(found); // értesítés az App.jsx-nek
      alert("Sikeres bejelentkezés!");
      navigate("/");
    } else {
      alert("Hibás email vagy jelszó.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">🔐 Bejelentkezés</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Jelszó"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Belépés
        </button>
      </div>
    </div>
  );
}
