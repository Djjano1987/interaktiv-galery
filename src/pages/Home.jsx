import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = () => {
    const registered = JSON.parse(localStorage.getItem("user"));

    // Admin belépés
    if (email === "k.janika87@gmail.com" && password === "janikajano") {
      const adminUser = { email, password, isAdmin: true };
      localStorage.setItem("loggedInUser", JSON.stringify(adminUser));
      setUser(adminUser);
      setMessage("Sikeres admin bejelentkezés!");
      return;
    }

    // Normál regisztrált felhasználó
    if (registered && registered.email === email && registered.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(registered));
      setUser(registered);
      setMessage("Sikeres bejelentkezés!");
    } else {
      setMessage("Hibás e-mail vagy jelszó.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <div className="bg-white/80 p-6 rounded-xl shadow-md max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4">🎨 Interaktív Művészeti Galéria</h1>
        {user ? (
          <>
            <p className="mb-2">Bejelentkezve mint: <strong>{user.email}</strong></p>
            <Link to="/upload" className="text-blue-600 underline block mb-4">Képfeltöltés</Link>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
              Kijelentkezés
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border mb-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Jelszó"
              className="w-full p-2 border mb-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Bejelentkezés
            </button>
            {message && <p className="mt-2 text-sm text-green-700">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}

